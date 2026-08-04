import {
  ClipboardList,
  ClipboardCheck,
  Clipboard,
  Calculator,
} from "lucide-react";

import { THEME } from "../theme";

export const courseStatistics = {
  "this-session": {
    total: 32,
    chart: [
      {
        name: "In Progress",
        value: 5,
        color: THEME.colors.info,
      },
      {
        name: "Completed",
        value: 27,
        color: THEME.colors.success,
      },
      {
        name: "Dropped",
        value: 0,
        color: THEME.colors.warning,
      },
    ],

    list: [
      {
        label: "Total Units Registered",
        value: "98",
        icon: ClipboardList,
      },
      {
        label: "Total Units Completed",
        value: "81",
        icon: ClipboardCheck,
      },
      {
        label: "Total Units Remaining",
        value: "17",
        icon: Clipboard,
      },
      {
        label: "Average Unit Load",
        value: "19.6",
        icon: Calculator,
      },
    ],
  },

  "all-time": {
    total: 145,

    chart: [
      {
        name: "In Progress",
        value: 5,
        color: THEME.colors.info,
      },
      {
        name: "Completed",
        value: 138,
        color: THEME.colors.success,
      },
      {
        name: "Dropped",
        value: 2,
        color: THEME.colors.warning,
      },
    ],

    list: [
      {
        label: "Total Units Registered",
        value: "342",
        icon: ClipboardList,
      },
      {
        label: "Total Units Completed",
        value: "325",
        icon: ClipboardCheck,
      },
      {
        label: "Total Units Remaining",
        value: "17",
        icon: Clipboard,
      },
      {
        label: "Average Unit Load",
        value: "21.4",
        icon: Calculator,
      },
    ],
  },
};
