import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./useAuthStore";

const apiUrl = 'http://localhost:4000/products';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(`${apiUrl}`);
        this.products = res.data;
      } catch (error) {
        this.error = 'Dohvaćanje artikala nije uspjelo';
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchProductsById(id) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(`${apiUrl}/${id}`);
        return res.data;
      } catch (error) {
        this.error = 'Dohvaćanje artikala nije uspjelo';
      } finally {
        this.loading = false;
      }
    },

    async createProduct(productData) {
      const authStore = useAuthStore();
      const token = authStore.auth.token;
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.post(`${apiUrl}`, productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.products.push(res.data);
      } catch (error) {
        this.error = 'Dodavanje artikla nije uspjelo';
      } finally {
        this.loading = false;
      }
    },

    async updateProduct(id, productData) {
      const authStore = useAuthStore();
      const token = authStore.auth.token;
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.put(`${apiUrl}/${id}`, productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
          this.products[index] = res.data;
        }
      } catch (error) {
        this.error = 'Ažuriranje artikla nije uspjelo';
      } finally {
        this.loading = false;
      }
    },

    async deleteProduct(id) {
      const authStore = useAuthStore();
      const token = authStore.token;
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`${apiUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.products = this.products.filter((product) => product.id !== id);
      } catch (error) {
        this.error = 'Uklanjanje artikla nije uspjelo';
      } finally {
        this.loading = false;
      }
    },
  },
});