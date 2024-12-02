<template>
    <v-row class="search-container">
        <!-- Search Form Section -->
        <v-col cols="12">
            <CardHeaderFooter title="SKU Search" elevation="2">
                <v-row class="px-2">
                    <!-- First row (always visible) -->
                    <v-col cols="12" lg="3" md="6">
                        <v-label class="label-text">Name</v-label>
                        <v-text-field v-model="searchForm.name" density="comfortable" variant="outlined"
                            placeholder="Enter full name" color="primary" hide-details="auto" clearable></v-text-field>
                    </v-col>

                    <v-col cols="12" lg="3" md="6">
                        <v-label class="label-text">Email</v-label>
                        <v-text-field v-model="searchForm.email" density="comfortable" variant="outlined"
                            placeholder="Enter email" color="primary" hide-details="auto" clearable></v-text-field>
                    </v-col>

                    <template v-if="showAdvanced">
                        <v-col cols="12" lg="3" md="6">
                            <v-label class="label-text">Phone</v-label>
                            <v-text-field v-model="searchForm.phone" density="comfortable" variant="outlined"
                                placeholder="Enter phone number" color="primary" hide-details="auto"
                                clearable></v-text-field>
                        </v-col>

                        <v-col cols="12" lg="3" md="6">
                            <v-label class="label-text">Address</v-label>
                            <v-text-field v-model="searchForm.address" density="comfortable" variant="outlined"
                                placeholder="Enter address" color="primary" hide-details="auto"
                                clearable></v-text-field>
                        </v-col>

                        <v-col cols="12" lg="3" md="6">
                            <v-label class="label-text">Company</v-label>
                            <v-text-field v-model="searchForm.company" density="comfortable" variant="outlined"
                                placeholder="Enter company" color="primary" hide-details="auto"
                                clearable></v-text-field>
                        </v-col>

                        <v-col cols="12" lg="3" md="6">
                            <v-label class="label-text">Department</v-label>
                            <v-text-field v-model="searchForm.department" density="comfortable" variant="outlined"
                                placeholder="Enter department" color="primary" hide-details="auto"
                                clearable></v-text-field>
                        </v-col>
                    </template>
                    <v-col cols="12" class="d-flex justify-end align-center mt-4">
                        <div class="d-flex align-center">
                            <span class="text-body-2 text-medium-emphasis mr-3">
                                {{ showAdvanced ? 'Show Less' : 'Show More' }}
                            </span>
                            <v-switch
                                v-model="showAdvanced"
                                hide-details
                                color="primary"
                                inset
                                class="switch-custom ma-0"
                            ></v-switch>
                        </div>
                    </v-col>
                </v-row>

                <template v-slot:footer>
                    <div class="text-right w-100">
                        <v-btn color="secondary" variant="flat" @click="handleSearch">Search</v-btn>
                        <v-btn color="primary" variant="outlined" @click="handleClear">Clear</v-btn>
                    </div>
                </template>
            </CardHeaderFooter>
        </v-col>

        <!-- Data Table Section -->
        <v-col cols="12">
            <UiParentCard title="SKU Search Results" elevation="2">
                <EasyDataTable v-model:items-selected="selectedItems" :headers="headers" :items="items"
                    :theme-color="themeColor" :loading="loading" :rows-per-page="10" :rows-items="[10, 20, 50]"
                    table-class-name="customize-table" buttons-pagination show-index>
                    <!-- Custom Name Column -->
                    <template #item-name="{ name }">
                        <div class="d-flex align-center">
                            <v-avatar color="primary" size="32" class="mr-2" variant="tonal">
                                <span class="text-caption">{{ name.charAt(0) }}</span>
                            </v-avatar>
                            <span class="font-weight-medium">{{ name }}</span>
                        </div>
                    </template>

                    <!-- Format date columns -->
                    <template #item-ctime="{ ctime }">
                        <span>{{ ctime }}</span>
                    </template>

                    <template #item-mtime="{ mtime }">
                        <span>{{ mtime }}</span>
                    </template>

                    <!-- Actions Column -->
                    <template #item-actions="item">
                        <div class="d-flex align-center justify-start gap-1">
                            <v-tooltip text="View" location="top">
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        v-bind="props"
                                        icon="mdi-eye"
                                        size="32"
                                        color="primary"
                                        variant="text"
                                        density="comfortable"
                                        @click="handleView(item)"
                                    ></v-btn>
                                </template>
                            </v-tooltip>
                            <v-tooltip text="Edit" location="top">
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        v-bind="props"
                                        icon="mdi-pencil"
                                        size="32"
                                        color="warning"
                                        variant="text"
                                        density="comfortable"
                                        @click="handleEdit(item)"
                                    ></v-btn>
                                </template>
                            </v-tooltip>
                            <v-tooltip text="Delete" location="top">
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        v-bind="props"
                                        icon="mdi-delete"
                                        size="32"
                                        color="error"
                                        variant="text"
                                        density="comfortable"
                                        @click="handleDelete(item)"
                                    ></v-btn>
                                </template>
                            </v-tooltip>
                        </div>
                    </template>
                </EasyDataTable>
            </UiParentCard>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import UiParentCard from '@/components/shared/UiParentCard.vue'
import CardHeaderFooter from '@/components/shared/CardHeaderFooter.vue'
import 'vue3-easy-data-table/dist/style.css'
import { listBrand } from '@/api/brand'

// Search form state
const searchForm = reactive({
    name: '',
    email: '',
    password: '',
    profileUrl: '',
    // New fields
    phone: '',
    address: '',
    company: '',
    department: ''
})

// Add showAdvanced ref
const showAdvanced = ref(false)

// Table state
const loading = ref(false)
const selectedItems = ref([])
const themeColor = ref('rgb(var(--v-theme-primary))')

// Table headers
const headers = [
    { text: 'Name', value: 'name', sortable: true },
    { text: 'Created By', value: 'create_by', sortable: true },
    { text: 'Created Time', value: 'ctime', sortable: true },
    { text: 'Modified Time', value: 'mtime', sortable: true },
    { text: 'Actions', value: 'actions', width: 160, sortable: false }
]

// Initialize items as empty array
const items = ref([])

// Function to format timestamp to readable date
const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString()
}

// Function to fetch brand list
const fetchBrandList = async () => {
    try {
        loading.value = true
        const response = await listBrand({})
        items.value = response.map(item => ({
            ...item,
            ctime: formatDate(item.ctime),
            mtime: formatDate(item.mtime)
        }))
    } catch (error) {
        console.error('Error fetching brand list:', error)
        // You might want to show an error message to the user
    } finally {
        loading.value = false
    }
}

// Fetch data when component mounts
onMounted(() => {
    fetchBrandList()
})

// Update search handler to refresh the list
const handleSearch = () => {
    fetchBrandList()
}

// Update handleClear to clear all fields
const handleClear = () => {
    Object.keys(searchForm).forEach(key => searchForm[key] = '')
}

const handleView = (item) => {
    console.log('View:', item)
}

const handleEdit = (item) => {
    console.log('Edit:', item)
}

const handleDelete = (item) => {
    console.log('Delete:', item)
}
</script>

<style lang="scss" scoped>
.search-container {
    gap: 1rem;
}

.label-text {
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(var(--v-theme-on-surface), 0.7);
    margin-bottom: 0.5rem;
}

:deep(.customize-table) {
    --easy-table-border: 1px solid rgba(var(--v-border-color), 0.08);
    --easy-table-row-border: 1px solid rgba(var(--v-border-color), 0.08);
    --easy-table-header-background-color: rgb(var(--v-theme-background));
    --easy-table-header-font-color: rgba(var(--v-theme-on-surface), 0.87);
    --easy-table-body-row-font-color: rgba(var(--v-theme-on-surface), 0.87);
    --easy-table-body-row-hover-background-color: rgba(var(--v-theme-primary), 0.08);

    thead th {
        font-weight: 600;
        font-size: 0.875rem;
        padding: 1rem;
    }

    tbody {
        tr {
            transition: background-color 0.25s ease;
            
            &:hover {
                background-color: rgba(var(--v-theme-primary), 0.08);
            }
        }

        td {
            padding: 0.875rem 1rem;
            font-size: 0.875rem;
        }
    }

    .v-avatar {
        background-color: rgba(var(--v-theme-primary), 0.12);
        color: rgb(var(--v-theme-primary));
    }

    .v-btn {
        opacity: 0.75;
        transition: opacity 0.25s ease;

        &:hover {
            opacity: 1;
        }
    }

}

.switch-custom {
    :deep(.v-label) {
        opacity: 0.7;
        margin-right: 12px;
        font-size: 0.875rem;
        font-weight: 500;
    }
    :deep(.v-switch__track) {
        opacity: 0.2;
    }
    :deep(.v-switch__thumb) {
        color: rgb(var(--v-theme-primary));
    }
}

// Add smooth hover effects for action buttons
.v-btn {
    &.v-btn--variant-text {
        &:hover {
            background-color: rgba(var(--v-theme-primary), 0.08);
        }
    }
}
</style>