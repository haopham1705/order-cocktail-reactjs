import axiosClient from "./axiosClient";

const productApi = {
    getAll(params) {
        const url = '/filter.php?c=Cocktail';
        return axiosClient.get(url, { params });
    },
    getSearchName(name) {
        const url = `/search.php?s=${name}`;
        return axiosClient.get(url);
    },
    getLookupId(id) {
        const url = `/lookup.php?i=${id}`;
        return axiosClient.get(url);
    },
    add(data, id) {
        const url = `/lookup.php?i=${id}`;
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/lookup.php?i=${data.id}`;
        return axiosClient.patch(url, data);
    },
    remove(id) {
        const url = `/lookup.php?i=${id}`;
        return axiosClient.delete(url);
    }
};

export default productApi;