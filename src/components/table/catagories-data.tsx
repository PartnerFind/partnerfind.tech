// Our values for the category column in the table

import { HandCoins, Users, Landmark, Store, Building } from "lucide-react";

export const categories = [
  {
    value: "FPO",
    label: "For-Profit (FPO)",
    icon: HandCoins,
  },
  {
    value: "NPO",
    label: "Non-Profit (NPO)",
    icon: Users,
  },
  {
    value: "GA",
    label: "Government Association (GA)",
    icon: Landmark,
  },
  {
    value: "LB",
    label: "Local Business (LB)",
    icon: Store,
  },
  {
    value: "CB",
    label: "Corporate Business (CB)",
    icon: Building,
  },
];
