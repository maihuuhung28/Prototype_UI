export interface PlanTask {
  styleInfo: string;
  startDay: number;
  endDay: number;
  color: string;
}

export interface LinePlanning {
  priLine: number;
  lineName: string;
  lineType: string;
  tasks: PlanTask[];
}

export const planningData: LinePlanning[] = [
];