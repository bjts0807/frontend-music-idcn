const LocalPaginationMixin = () => ({
    data() {
        return {
            original_data : [],
            filtered_data : [],
            pagination : {
                current_page : 1,
                page : 1,
                total : '',
                per_page : 5,
            }
        }
    },
    methods : {
        changePage(page){
            this.pagination.current_page = page;
            this.pagination.page = page;
            this.pagination.total = this.filtered_data.length;
            this.pagination.data = this.page_data;
        },
        perPageChange(){
            this.pagination.page = 1;
            this.pagination.current_page = 1;
        },
        nextPage(){
            const nextPage = parseInt(this.pagination.page) + parseInt(1);
            this.hasNext && this.changePage(nextPage);
        },
        prevPage(){
            const prevPage = parseInt(this.pagination.page) - 1;
            this.hasPrev && this.changePage(prevPage);
        }
    },
    computed : {
        from(){
            return (this.pagination.per_page * this.pagination.current_page) - this.pagination.per_page;
        },
        to(){
            return (this.pagination.per_page * this.pagination.current_page) > this.filtered_data.length
                ? this.filtered_data.length
                : (this.pagination.per_page * this.pagination.current_page) - 1;
        },
        page_data(){
            return this.filtered_data.filter((value, index) => index >= this.from && index <= this.to);
        },
        hasNext(){
            return (this.pagination.page + 1) <= this.total_pages
        },
        hasPrev(){
            return (this.pagination.page - 1) > 0;
        },
        total_pages() {
            return !this.pagination.total !== undefined && this.pagination.total > 0 && Number.isInteger(this.pagination.total)
                ? Math.ceil(this.pagination.total / this.pagination.per_page)
                : 0;
        },
    }
})

export default LocalPaginationMixin;
