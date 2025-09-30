import AddTask from '@/components/AddTask';
import DateTimeFilter from '@/components/DateTimeFilter';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import StatusAndFilter from '@/components/StatusAndFilter';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListPagination';
import React from 'react';

const HomePage = () => {
    return (
        <div class="container pt-8 mx-auto">
            <div className="w-full max-w-2xl p-6 mx-auto space-y-6">

                {/* Đầu Trang */}
                <Header/>

                {/* Tạo Nhiệm Vụ */}
                <AddTask/>

                {/* Thống Kê và Bộ Lọc */}
                <StatusAndFilter/>

                {/* Danh Sách */}
                <TaskList/>

                <div className="flex flex-col items-center">
                    {/* Phân Trang */}
                    <TaskListPagination/>
                    {/* Thống Kê và Bộ Lọc */}
                    <DateTimeFilter/>
                </div>


                {/* Thống Kê và Bộ Lọc */}
                <Footer/>
            </div>
        </div>
    );
}

export default HomePage;
