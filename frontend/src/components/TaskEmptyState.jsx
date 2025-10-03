import React from "react";
import { Card } from "./ui/card";
import { FileX } from "lucide-react";

const TaskEmptyState = ({ filter }) => {
    return (
        <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
            <div className="space-y-3">
                <FileX className="mx-auto size-12 text-muted-foreground" />
                <div>
                    <h3 className="font-medium text-foreground">
                        {filter === "active"
                            ? "Không có task nào đang làm"
                            : filter === "completed"
                            ? "Không có task nào hoàn thành"
                            : "Chưa có task"}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        {filter === "all"
                            ? "Thêm nhiệm vụ đầu tiên vào để bắt đầu!"
                            : `Chuyển sang "tất cả" để thấy những nhiệm vụ ${
                                  filter === "active" ? "hoàn thành" : "đang làm"
                              }`}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default TaskEmptyState;
