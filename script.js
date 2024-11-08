// app.js
document.addEventListener('DOMContentLoaded', function() {
    // Lắng nghe sự kiện click trên tất cả các liên kết
    document.querySelectorAll('a[data-page]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Ngừng hành động mặc định (reload trang)

            const page = e.target.getAttribute('data-page'); // Lấy giá trị thuộc tính data-page
            loadPageContent(page); // Tải nội dung tương ứng
            history.pushState({page: page}, '', `/${page}`); // Cập nhật URL mà không reload trang
        });
    });

    // Kiểm tra URL khi tải trang lần đầu và tải nội dung tương ứng
    const currentPage = window.location.pathname.split('/')[1] || 'home';
    loadPageContent(currentPage);
});

// Hàm tải nội dung vào #content
function loadPageContent(page) {
    const contentDiv = document.getElementById('content');
    
    // Tải nội dung tương ứng từ các file HTML khác nhau
    fetch(`${page}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải nội dung trang');
            }
            return response.text();
        })
        .then(data => {
            contentDiv.innerHTML = data;  // Thay thế nội dung
        })
        .catch(error => {
            console.error('Có lỗi xảy ra:', error);
        });
}




