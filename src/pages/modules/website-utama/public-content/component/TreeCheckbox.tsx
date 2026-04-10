// TreeCheckbox.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form'

export interface TreeNode {
  id_satuan_organisasi: string
  nama: string
  children?: TreeNode[]
}

interface NodeMapValue {
  node: TreeNode
  parentId: string | null
  childrenIds: string[]
}

export interface SelectionMetadata {
  selectedIds: string[]
  parentIds: string[] // id dari node yang memiliki children dan terpilih
  childIds: string[] // id dari node tanpa children yang terpilih
  allRelations: Record<string, { parentId: string | null; childrenIds: string[] }>
}

// ==================== Helper Functions ====================
function buildNodeMap(tree: TreeNode[]): Map<string, NodeMapValue> {
  const map = new Map<string, NodeMapValue>()
  const traverse = (node: TreeNode, parentId: string | null) => {
    const childrenIds: string[] = []
    if (node.children) {
      for (const child of node.children) {
        childrenIds.push(child.id_satuan_organisasi)
        traverse(child, node.id_satuan_organisasi)
      }
    }
    map.set(node.id_satuan_organisasi, { node, parentId, childrenIds })
  }
  for (const root of tree) traverse(root, null)
  return map
}

function computeStates(
  selectedSet: Set<string>,
  nodeMap: Map<string, NodeMapValue>
): Map<string, { checked: boolean; indeterminate: boolean }> {
  const cache = new Map<string, { checked: boolean; indeterminate: boolean }>()
  const getState = (nodeId: string): { checked: boolean; indeterminate: boolean } => {
    if (cache.has(nodeId)) return cache.get(nodeId)!
    const item = nodeMap.get(nodeId)!
    if (item.childrenIds.length === 0) {
      const res = { checked: selectedSet.has(nodeId), indeterminate: false }
      cache.set(nodeId, res)
      return res
    }
    let allChecked = true
    let anyChecked = false
    for (const childId of item.childrenIds) {
      const childState = getState(childId)
      if (!childState.checked) allChecked = false
      if (childState.checked || childState.indeterminate) anyChecked = true
    }
    const res = {
      checked: allChecked,
      indeterminate: !allChecked && anyChecked,
    }
    cache.set(nodeId, res)
    return res
  }
  for (const id of nodeMap.keys()) getState(id)
  return cache
}

function buildMetadata(
  selectedIds: string[],
  nodeMap: Map<string, NodeMapValue>
): SelectionMetadata {
  const parentIds: string[] = []
  const childIds: string[] = []
  const allRelations: Record<string, { parentId: string | null; childrenIds: string[] }> = {}
  for (const id of selectedIds) {
    const item = nodeMap.get(id)!
    allRelations[id] = { parentId: item.parentId, childrenIds: item.childrenIds }
    if (item.childrenIds.length > 0) parentIds.push(id)
    else childIds.push(id)
  }
  return { selectedIds, parentIds, childIds, allRelations }
}

// ==================== Komponen Node Internal ====================
interface TreeCheckboxNodeProps {
  node: TreeNode
  state: { checked: boolean; indeterminate: boolean }
  onToggle: (id: string, checked: boolean) => void
  level?: number
}

const TreeCheckboxNode: React.FC<TreeCheckboxNodeProps> = ({
  node,
  state,
  onToggle,
  level = 0,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = state.indeterminate
    }
  }, [state.indeterminate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(node.id_satuan_organisasi, e.target.checked)
  }

  return (
    <div style={{ marginLeft: level * 24 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <input type="checkbox" ref={inputRef} checked={state.checked} onChange={handleChange} />
        <span>{node.nama}</span>
      </label>
      {node.children?.map((child) => (
        <TreeCheckboxNode
          key={child.id_satuan_organisasi}
          node={child}
          state={{
            checked: false,
            indeterminate: false,
          }}
          onToggle={function (id: string, checked: boolean): void {
            console.log('checked', checked)
            console.log('id', id)
          }}
        />
      ))}
    </div>
  )
}

// Versi perbaikan: kita render dengan menyediakan statesMap untuk semua node
const RenderTree: React.FC<{
  nodes: TreeNode[]
  statesMap: Map<string, { checked: boolean; indeterminate: boolean }>
  onToggle: (id: string, checked: boolean) => void
  level?: number
}> = ({ nodes, statesMap, onToggle, level = 0 }) => {
  return (
    <>
      {nodes.map((node) => {
        const state = statesMap.get(node.id_satuan_organisasi)!
        return (
          <div key={node.id_satuan_organisasi} style={{ marginLeft: level * 24 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <input
                type="checkbox"
                ref={(el) => {
                  if (el) el.indeterminate = state.indeterminate
                }}
                checked={state.checked}
                onChange={(e) => onToggle(node.id_satuan_organisasi, e.target.checked)}
              />
              <span>{node.nama}</span>
            </label>
            {node.children && (
              <RenderTree
                nodes={node.children}
                statesMap={statesMap}
                onToggle={onToggle}
                level={level + 1}
              />
            )}
          </div>
        )
      })}
    </>
  )
}

// ==================== Komponen Utama ====================
export interface TreeCheckboxProps {
  data: TreeNode[] // data tree
  selectedIds?: string[] // untuk controlled component
  onChange?: (selectedIds: string[], metadata: SelectionMetadata) => void
}

export const TreeCheckbox: React.FC<TreeCheckboxProps> = ({
  data,
  selectedIds: externalSelectedIds,
  onChange,
}) => {
  const nodeMap = useMemo(() => buildNodeMap(data), [data])
  const [internalSelectedSet, setInternalSelectedSet] = useState<Set<string>>(
    () => new Set(externalSelectedIds || [])
  )

  // Sinkronisasi dengan external selectedIds jika diperlukan
  useEffect(() => {
    if (externalSelectedIds !== undefined) {
      setInternalSelectedSet(new Set(externalSelectedIds))
    }
  }, [externalSelectedIds])

  const statesMap = useMemo(
    () => computeStates(internalSelectedSet, nodeMap),
    [internalSelectedSet, nodeMap]
  )

  const toggleNode = useCallback(
    (nodeId: string, isChecked: boolean) => {
      const newSelected = new Set(internalSelectedSet)
      const item = nodeMap.get(nodeId)!

      if (isChecked) {
        // Check node dan semua descendants
        const addRecursive = (id: string) => {
          newSelected.add(id)
          const node = nodeMap.get(id)!
          for (const childId of node.childrenIds) addRecursive(childId)
        }
        addRecursive(nodeId)

        // Update ancestors: jika semua children terpilih, tambahkan ancestor
        let parentId = item.parentId
        while (parentId !== null) {
          const parentItem = nodeMap.get(parentId)!
          const allChildrenSelected = parentItem.childrenIds.every((cid) => newSelected.has(cid))
          if (allChildrenSelected) newSelected.add(parentId)
          else newSelected.delete(parentId)
          parentId = nodeMap.get(parentId)?.parentId ?? null
        }
      } else {
        // Uncheck node dan semua descendants
        const removeRecursive = (id: string) => {
          newSelected.delete(id)
          const node = nodeMap.get(id)!
          for (const childId of node.childrenIds) removeRecursive(childId)
        }
        removeRecursive(nodeId)

        // Update ancestors: jika ancestor terpilih, hapus karena tidak semua children terpilih
        let parentId = item.parentId
        while (parentId !== null) {
          if (newSelected.has(parentId)) newSelected.delete(parentId)
          parentId = nodeMap.get(parentId)?.parentId ?? null
        }
      }

      setInternalSelectedSet(newSelected)
      const selectedIdsArray = Array.from(newSelected)
      const metadata = buildMetadata(selectedIdsArray, nodeMap)
      onChange?.(selectedIdsArray, metadata)
    },
    [internalSelectedSet, nodeMap, onChange]
  )

  return (
    <div className={'w-fit'}>
      <RenderTree nodes={data} statesMap={statesMap} onToggle={toggleNode} />
    </div>
  )
}

interface TreeCheckboxControllerProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  data: TreeNode[]
  rules?: any
}

export function TreeCheckboxController<TFieldValues extends FieldValues>({
  name,
  control,
  data,
  rules,
}: TreeCheckboxControllerProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <TreeCheckbox
          data={data}
          selectedIds={value}
          onChange={(selectedIds) => {
            onChange(selectedIds)
          }}
        />
      )}
    />
  )
}
