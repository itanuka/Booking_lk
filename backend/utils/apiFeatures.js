class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'           //desabaling case sensitivity
            }

        } : {}

        this.query = this.query.find({ ...keyword });
        return this;
    }

    admin_order_search() {
        const keyword = this.queryStr.keyword ? {
            customerName: {
                $regex: this.queryStr.keyword,
                $options: 'i'           //desabaling case sensitivity
            }
        } : {}

        console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);

        // Advance filter for price
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }

    searchTheater() {
        const keyword = this.queryStr.keyword ? {
            description: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({ ...keyword });
        return this;
    }


    //tharusha
    emp_search() {
        const keyword = this.queryStr.keyword ? {
            First_Name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }


    //Thiran
    search1() {
        const keyword = this.queryStr.keyword ? {
            s_item_name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }

        } : {}

        console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }

    search2() {
        const keyword = this.queryStr.keyword ? {
            supplier_name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }

        } : {}

        console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }

    search3() {
        const keyword = this.queryStr.keyword ? {
            supplier_id: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }

        } : {}

        console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }


}

module.exports = APIFeatures