import { useState, type ReactNode } from "react";
import {
  IconManagement,
  IconReport,
  IconSetting,
  IconWebsite,
} from "./components/icon";

const ModulesViewModel = () => {
  const [modules, setModules] = useState([
    {
      icon: <IconSetting />,
      label: "Pengaturan",
      link: "#",
      linkWebsite: "",
    },
    {
      icon: <IconWebsite />,
      label: "Website Utama",
      link: "#",
      linkWebsite: "https://stain-madina.ac.id",
    },
    {
      icon: <IconWebsite />,
      label: "Website Prodi",
      link: "#",
      linkWebsite: "",
    },
    {
      icon: <IconWebsite />,
      label: "Website Unit",
      link: "#",
      linkWebsite: "",
    },
    {
      icon: <IconWebsite />,
      label: "Website Lembaga",
      link: "#",
      linkWebsite: "",
    },
    {
      icon: <IconManagement />,
      label: "Manajemen Editor",
      link: "#",
      linkWebsite: "",
    },
    {
      icon: <IconReport />,
      label: "Laporan & Statistik",
      link: "#",
      linkWebsite: "",
    },
  ]);
  const [module, setModule] = useState<{
    icon: ReactNode;
    label: string;
    link: string;
    linkWebsite: string;
  }>();
  return {
    modules,
    setModules,
    module,setModule
  };
};

export default ModulesViewModel;
