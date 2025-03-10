document.addEventListener("DOMContentLoaded", function () {
    const postsWrapper = document.querySelector(".posts-wrapper");
    const pagination = document.querySelector(".pagination");
    const postCards = Array.from(postsWrapper.querySelectorAll(".post-card"));
    const postsPerPage = 8;
    let currentPage = 1;

    function displayPosts(page) {
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        postCards.forEach((post) => (post.style.display = "none"));

        postCards.slice(startIndex, endIndex).forEach((post) => (post.style.display = "block"));
    }
    function createPagination() {
        const totalPages = Math.ceil(postCards.length / postsPerPage);
        pagination.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.innerText = i;
            button.addEventListener("click", () => {
                showLoader(); 
                setTimeout(() => {
                    currentPage = i;
                    displayPosts(currentPage);
                    updateActiveButton();
                    hideLoader(); 
                }, 1000); 
            });

            if (i === currentPage) {
                button.classList.add("active");
            }

            pagination.appendChild(button);
        }
    }

    function updateActiveButton() {
        const buttons = pagination.querySelectorAll("button");
        buttons.forEach((button, index) => {
            if (index + 1 === currentPage) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    }

    function showLoader() {
        const loader = document.createElement("div");
        loader.className = "loader";
        loader.innerHTML = "Loading..."; 
        postsWrapper.appendChild(loader);
    }

    function hideLoader() {
        const loader = postsWrapper.querySelector(".loader");
        if (loader) {
            loader.remove();
        }
    }

    displayPosts(currentPage);
    createPagination();
});