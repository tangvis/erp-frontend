<template>
  <v-row class="search-container">
    <v-col cols="12">
      <UiTableCardSearch title="Brand List" elevation="2">
        <v-row class="px-2">
          <v-col cols="12" lg="2" md="6">
            <v-label class="label-text">Name</v-label>
            <v-text-field v-model="searchForm.name" density="compact" variant="outlined" placeholder="Enter full name"
              color="primary" hide-details="auto" clearable></v-text-field>
          </v-col>

          <v-col cols="12" lg="2" md="6">
            <v-label class="label-text">Email</v-label>
            <v-text-field v-model="searchForm.email" density="compact" variant="outlined" placeholder="Enter email"
              color="primary" hide-details="auto" clearable></v-text-field>
          </v-col>

          <template v-if="showAdvanced">
            <v-col cols="12" lg="2" md="6">
              <v-label class="label-text">Phone</v-label>
              <v-text-field v-model="searchForm.phone" density="compact" variant="outlined"
                placeholder="Enter phone number" color="primary" hide-details="auto" clearable></v-text-field>
            </v-col>

            <v-col cols="12" lg="2" md="6">
              <v-label class="label-text">Address</v-label>
              <v-text-field v-model="searchForm.address" density="compact" variant="outlined"
                placeholder="Enter address" color="primary" hide-details="auto" clearable></v-text-field>
            </v-col>

            <v-col cols="12" lg="2" md="6">
              <v-label class="label-text">Company</v-label>
              <v-text-field v-model="searchForm.company" density="compact" variant="outlined"
                placeholder="Enter company" color="primary" hide-details="auto" clearable></v-text-field>
            </v-col>

            <v-col cols="12" lg="2" md="6">
              <v-label class="label-text">Department</v-label>
              <v-text-field v-model="searchForm.department" density="compact" variant="outlined"
                placeholder="Enter department" color="primary" hide-details="auto" clearable></v-text-field>
            </v-col>
          </template>
        </v-row>

        <template #footer>
          <v-col cols="12" class="d-flex justify-end align-center ma-0 py-0">
            <div class="d-flex align-center">
              <span class="text-body-2 text-medium-emphasis mr-3">
                {{ showAdvanced ? 'Show Less' : 'Show More' }}
              </span>
              <v-switch v-model="showAdvanced" hide-details color="primary" inset
                class="switch-custom mr-auto"></v-switch>
            </div>

            <!-- Search Buttons -->
            <v-btn color="secondary" variant="flat" class="ml-4" @click="handleSearch">Search</v-btn>
            <v-btn color="primary" variant="outlined" class="ml-2" @click="handleClear">Clear</v-btn>
          </v-col>
        </template>

        <!-- Table Slot -->
        <template #table>
          <v-col cols="12" md="12">
            <v-row justify="space-between" class="align-right mb-3">
              <v-col cols="12" md="3">
              </v-col>
              <v-col cols="12" md="3" class="pt-0 pb-0">
                <div class="d-flex ga-2 justify-end">
                  <v-btn elevation="0" variant="flat" color="error" :disabled="!selectedItems.length"
                    prepend-icon="mdi-minus-circle-outline" @click="batchDeleteBrand">Del</v-btn>
                  <v-btn elevation="0" variant="flat" color="primary"
                    prepend-icon="mdi-plus-circle-outline" @click="dialog = true">Add</v-btn>
                </div>
              </v-col>
            </v-row>
            <EasyDataTable :headers="headers" :items="items" table-class-name="customize-table action-position"
              :server-items-length="serverItemsLength" :loading="loading" v-model:server-options="serverOptions"
              @update:server-options="handleServerOptionsUpdate" v-model:items-selected="selectedItems"
              :rows-items="[10, 25, 50, 100]" attach="body" buttons-pagination show-index>
              <template #item-id="{ id }">
                <div class="player-wrapper">
                  <h5 class="text-h5">#{{ id }}</h5>
                </div>
              </template>
              <template #item-name="{ name }">
                <div class="player-wrapper">
                  <h5 class="text-h5">{{ name }}</h5>
                </div>
              </template>
              <template #item-actions="item">
                <div class="operation-wrapper">
                  <v-btn icon color="secondary" variant="text">
                    <EyeIcon size="20" />
                  </v-btn>
                  <v-btn icon color="primary" variant="text" @click="handleDelete([item])">
                    <TrashIcon size="20" />
                  </v-btn>
                </div>
              </template>
            </EasyDataTable>
          </v-col>
        </template>
      </UiTableCardSearch>
    </v-col>
  </v-row>
  <v-dialog v-model="dialog" maxWidth="400" height="500">
    <BrandAdd @closeDialog="dialog = false" @brandAdded="handleSearch" />
  </v-dialog>
  <v-dialog v-model="deleteDialog" max-width="400">
    <v-card>
      <v-card-title class="text-18 pt-4 pb-2 pl-4">Confirm Delete</v-card-title>
      <v-card-text class="pa-4">
        Are you sure to delete these {{ itemsToDelete.length }} brands?
        <div v-if="itemsToDelete.length" class="my-2 text-medium-emphasis">
          {{ formatSelectedItems(itemsToDelete) }}
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-1" variant="text" @click="deleteDialog = false">
          Cancel
        </v-btn>
        <v-btn color="error" variant="flat" @click="confirmDelete" :loading="loading">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UiTableCardSearch from '@/components/shared/UiTableCardSearch.vue'
import 'vue3-easy-data-table/dist/style.css'
import { listBrand, deleteBrand } from '@/api/brand'
import BrandAdd from '@/components/BrandAdd.vue';

export default {
  name: 'Gbe',

  components: {
    UiTableCardSearch,
    BrandAdd
  },

  data() {
    return {
      // Search form state
      searchForm: {
        name: '',
        email: '',
        password: '',
        profileUrl: '',
        phone: '',
        address: '',
        company: '',
        department: ''
      },

      // UI state
      showAdvanced: false,
      loading: false,
      dialog: false,
      selectedItems: [],
      themeColor: 'rgb(var(--v-theme-primary))',

      // Table data
      headers: [
        { text: 'ID', value: 'id', sortable: true },
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Created By', value: 'create_by', sortable: true },
        { text: 'Created Time', value: 'ctime', sortable: true },
        { text: 'Last Modified Time', value: 'mtime', sortable: true },
        { text: 'Actions', value: 'actions', width: 160, sortable: false }
      ],
      items: [],

      // Add these new properties
      deleteDialog: false,
      itemsToDelete: [],

      // Add pagination data
      serverOptions: {
        page: 1,
        rowsPerPage: 10
      },
      serverItemsLength: 0
    }
  },

  methods: {
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString()
    },

    fetchBrandList() {
      this.loading = true;

      // Store current state in case of error
      const previousItems = [...this.items];
      const previousTotal = this.serverItemsLength;
      const previousPage = this.serverOptions.page;

      // Prepare request params
      const params = {
        page_no: this.serverOptions.page,
        count: this.serverOptions.rowsPerPage
      };

      if (this.searchForm.name?.trim()) {
        params.name = this.searchForm.name.trim();
      }

      listBrand(params)
        .then(response => {
          this.items = response.items.map(item => ({
            ...item,
            ctime: this.formatDate(item.ctime),
            mtime: this.formatDate(item.mtime)
          }));
          this.serverItemsLength = response.total;
        })
        .catch(error => {
          console.error('Error fetching brand list:', error);
          // Restore previous state on error
          this.items = previousItems;
          this.serverItemsLength = previousTotal;
          this.serverOptions.page = previousPage;
          // Optionally show error message to user
          // this.$message.error('Failed to fetch brand list');
        })
        .finally(() => {
          this.loading = false;
        });
    },

    batchDeleteBrand() {
      if (!this.selectedItems.length) return;
      this.itemsToDelete = this.selectedItems;
      this.deleteDialog = true;
    },

    deleteBrand(id) {
      this.loading = true;
      deleteBrand({ ids: [id] }).then(() => {
        this.fetchBrandList();
      }).catch((error) => {
        console.error('Error deleting brand:', error);
      }).finally(() => {
        this.loading = false;
      });
    },

    handleSearch() {
      this.serverOptions.page = 1; // Reset to first page when searching
      this.fetchBrandList();
    },

    handleClear() {
      Object.keys(this.searchForm).forEach(key => {
        this.searchForm[key] = '';
      });
      this.serverOptions.page = 1; // Reset to first page
      this.fetchBrandList();
    },

    handleView(item) {
      console.log('View:', item)
    },

    handleEdit(item) {
      console.log('Edit:', item)
    },

    handleDelete(items) {
      this.itemsToDelete = items;
      this.deleteDialog = true;
    },

    confirmDelete() {
      if (!this.itemsToDelete.length) return;

      this.loading = true;
      deleteBrand({ ids: this.itemsToDelete.map(item => item.id) })
        .then(() => {
          this.fetchBrandList();
        })
        .catch((error) => {
          console.error('Error deleting brand:', error);
        })
        .finally(() => {
          this.loading = false;
          this.deleteDialog = false;
          this.itemsToDelete = [];
        });
    },

    formatSelectedItems(items) {
      const maxDisplay = 3; // Number of items to display
      if (!items.length) return '';

      if (items.length <= maxDisplay) {
        return items.map(item => item.name).join(', ');
      }

      const displayedItems = items.slice(0, maxDisplay);
      const remainingCount = items.length - maxDisplay;

      return `${displayedItems.map(item => item.name).join(', ')} and ${remainingCount} more item${remainingCount > 1 ? 's' : ''}`;
    },

    handleServerOptionsUpdate() {
      this.fetchBrandList();
    },
  },

  mounted() {
    this.dialog = false
    this.fetchBrandList()
  }
}
</script>

<style lang="scss">
.action-position {
  .vue3-easy-data-table__main {
    .vue3-easy-data-table__header {
      th {
        &:last-child {
          padding-left: 30px;
        }
      }
    }
  }
}

// Optional: Add styles for the confirmation dialog
.v-dialog {
  .v-card-title {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
}
</style>