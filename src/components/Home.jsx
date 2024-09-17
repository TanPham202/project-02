const Home = () => {
    return (
        <>
            <div className="home-container">
                <div className="mt-3"> Yêu cầu: <br /> Sử dụng API từ trang web https://reqres.in/ để tạo website. </div>
                <div> Sử dụng thư viện React để tạo một màn hình website cơ bản bao gồm các chức năng: </div>
                <ul>
                    <li> 1. Đăng nhập </li>
                    <li> 2. Thêm User </li>
                    <li> 3. Sửa User </li>
                    <li> 4. Xóa User </li>
                    <li> 5. Hiển thị tất cả các User </li>
                    <li> 6. Tìm kiếm User theo Id </li>
                    <li> 7. Sắp xếp theo FirstName </li>
                    <li> 8. Import User từ file .csv </li>
                    <li> 9. Export User ra file .csv </li>
                </ul>
                <div> Tự do tùy chỉnh html, css để có một website nhẹ nhàng, khoa học và đẹp. </div>
                <div> Commit và đẩy source code lên github public. <br /> Triển khai website lên Heroku để demo. </div>
                <br />
                <b> Result: </b> Thời gian hoàn thành: 1-3 ngày
                <br />
                Gửi link Heroku và Github link lại email này
                <br />
                Thời gian phản hồi 2 ngày làm việc kể từ ngày nhận được bài thi.
                <br />
                Yêu cầu backend (optional - không bắt buộc):
                <br />
                Sử dụng python django rest framework, tạo các API như trên trang web: https://reqres.in/
            </div>
        </>
    )
}

export default Home