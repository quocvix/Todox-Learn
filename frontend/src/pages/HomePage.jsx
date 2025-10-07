import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatusAndFilter from "@/components/StatsAndFilter";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTaskCount, setActiveTaskCount] = useState(0);
    const [completeTaskCount, setCompleteTaskCount] = useState(0);
    const [filter, setFilter] = useState("all");
    const [dateQuery, setDateQuery] = useState("today");
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTasks();
    }, [dateQuery]);

    useEffect(() => {
        setPage(1);
    }, [filter, dateQuery]);

    // logic
    const fetchTasks = async (req, res) => {
        try {
            const res = await api.get(`/tasks?filter=${dateQuery}`);
            setTaskBuffer(res.data.tasks);
            setActiveTaskCount(res.data.activeCount);
            setCompleteTaskCount(res.data.completeCount);
        } catch (error) {
            console.log("Lỗi xảy ra khi truy xuất task", error);
            toast.error("Lỗi xảy ra khi truy xuất task");
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // biến
    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case "active":
                return task.status === "active";
            case "completed":
                return task.status === "complete";
            default:
                return true;
        }
    });

    const handleTaskChanged = () => {
        fetchTasks();
    };

    const visibleTasks = filteredTasks.slice(
        (page - 1) * visibleTaskLimit,
        page * visibleTaskLimit
    );

    if (visibleTasks.length === 0) {
        handlePrev();
    }

    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

    return (
        <div className="min-h-screen w-full relative bg-white">
            {/* Cool Blue Glow Top */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "#ffffff",
                    backgroundImage: `
                        radial-gradient(
                        circle at top center,
                        rgba(70, 130, 180, 0.5),
                        transparent 70%
                        )
                    `,
                    filter: "blur(80px)",
                    backgroundRepeat: "no-repeat",
                }}
            />
            {/* Your Content/Components */}
            <div className="container pt-8 mx-auto relative z-10">
                <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
                    {/* Đầu Trang */}
                    <Header />

                    {/* Tạo Nhiệm Vụ */}
                    <AddTask handleNewTaskAdded={handleTaskChanged} />

                    {/* Thống Kê và Bộ Lọc */}
                    <StatusAndFilter
                        filter={filter}
                        setFilter={setFilter}
                        completedTaskCount={completeTaskCount}
                        activeTaskCount={activeTaskCount}
                    />

                    {/* Danh Sách */}
                    <TaskList
                        filteredTasks={visibleTasks}
                        filter={filter}
                        handleTaskChanged={handleTaskChanged}
                    />

                    {/* Phân Trang và Lọc Date */}
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <TaskListPagination
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            handlePageChange={handlePageChange}
                            page={page}
                            totalPages={totalPages}
                        />
                        <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
                    </div>

                    {/* Chân Trang */}
                    <Footer
                        completedTaskCount={completeTaskCount}
                        activeTaskCount={activeTaskCount}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
