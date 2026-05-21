import React, { useMemo } from 'react';
import Gantt, { 
  Tasks, Resources, ResourceAssignments, 
  Column, Editing, Toolbar, Item, Validation 
} from 'devextreme-react/gantt';
import { planningData } from '../data/planning.data';

export function PlanningTable({ onLineSelectionChange }: any) {

  // Chuyển đổi dữ liệu từ file planning.data sang cấu trúc Gantt
  const ganttData = useMemo(() => {
    const tasks: any[] = [];
    const resources: any[] = [];
    const assignments: any[] = [];
    let taskIdCounter = 1;

    // Lấy mốc "date1" trong ảnh là ngày 10/04/2026
    const baseDate = new Date(2026, 3, 10); 

    planningData.forEach((line, index) => {
      const resourceId = index + 1;
      
      // Tạo Resource (Tương ứng cột LINE trong ảnh: EE01, EE02...)
      resources.push({
        id: resourceId,
        text: line.lineName
      });

      line.tasks.forEach((t) => {
        const taskId = taskIdCounter++;
        
        // Tính Start/End dựa trên startDay/endDay (1-10)
        const start = new Date(baseDate);
        start.setDate(baseDate.getDate() + (t.startDay - 1));

        const end = new Date(baseDate);
        end.setDate(baseDate.getDate() + t.endDay);

        tasks.push({
          id: taskId,
          title: t.styleInfo,
          start: start,
          end: end,
          color: t.color,
          lineType: line.lineType,
          priLine: line.priLine
        });

        // Gán Task vào đúng Line
        assignments.push({
          id: taskId,
          taskId: taskId,
          resourceId: resourceId
        });
      });
    });

    return { tasks, resources, assignments };
  }, []);

  return (
    <div className="grid-container planning-gantt">
      <Gantt
        taskListWidth={350} //độ phân giải
        scaleType="days" //Đo thời gian theo ngày
        height={500}
        taskTitlePosition="inside"
        onSelectionChanged={(e) => onLineSelectionChange?.(e.selectedRowKey)}
        
        //Thanh Bar
        taskContentTemplate={(item: any) => {
          return `
            <div class="custom-task-bar" style="background-color: ${item.taskData.color}; height: 100%; display: flex; align-items: center; padding: 0 10px; color: #333; font-weight: 500; font-size: 11px; border: 1px solid rgba(0,0,0,0.1);">
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${item.taskData.line}
              </span>
            </div>
          `;
        }}
      >
        {/*Các cột hiển thị bên trái*/}
        <Column dataField="id" caption="PRI Line" width={80} alignment="center" />
        <Column dataField="line" caption="STYLE / LINE" width={180} />
        <Column dataField="lineType" caption="Line Type" width={90} />

        {/* Binding dữ liệu */}
        <Tasks dataSource={ganttData.tasks} />
        <Resources dataSource={ganttData.resources} />
        <ResourceAssignments dataSource={ganttData.assignments} />

        <Toolbar>
          <Item name="zoomIn" />
          <Item name="zoomOut" />
          <Item name="fullScreen" />
        </Toolbar>

        <Editing enabled={true} allowTaskUpdating={true} />
        <Validation autoUpdateParentTasks={true} />
      </Gantt>
    </div>
  );
}