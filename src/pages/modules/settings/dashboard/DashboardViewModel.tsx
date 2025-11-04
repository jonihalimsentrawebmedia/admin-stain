import { IconDomain, IconFaculty, IconInstitution, IconProgram, IconUnit, IconUniversity } from "./components/icon";

const DashboardViewModel = () => {
  const data = [
    {
      label: "Domain ",
      bg: "#F7F7F7",
      bgLabel: "#464646",
      icon: <IconDomain />,
      count: "1000",
    },
    {
      label: "Universitas ",
      bg: "#F5FFFA",
      bgLabel: "#0E874A",
      icon: <IconUniversity />,
      count: "1",
    },
    {
      label: "Fakultas",
      bg: "#F5F9FF",
      bgLabel: "#0E3E87",
      icon: <IconFaculty />,
      count: "6",
    },
    {
      label: "Program Studi",
      bg: "#FFF5F6",
      bgLabel: "#870E1A",
      icon: <IconProgram />,
      count: "12",
    },
    {
      label: "Unit",
      bg: "#FFFCF5",
      bgLabel: "#87690E",
      icon: <IconUnit />,
      count: "5",
    },
    {
      label: "Lembaga",
      bg: "#F4FEFF",
      bgLabel: "#0E8187",
      icon: <IconInstitution />,
      count: "5",
    },
  ];
  return {
    data
  }
};

export default DashboardViewModel;
