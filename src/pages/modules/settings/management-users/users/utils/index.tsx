export function returnStatus(value: string) {
    return value == "Y" ? <div className="flex gap-2 items-center">
        <div>Status</div>
        <div className="size-4 rounded-full bg-green-400"></div>
        <div>Aktif</div>
    </div> : <div className="flex gap-2 items-center">
        <div>Status</div>
        <div className="size-4 rounded-full bg-red-400"></div>
        <div>Tidak Aktif</div>
    </div>

}