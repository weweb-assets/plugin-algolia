<template>
    <wwEditorFormRow label="Index" required class="-full">
        <div class="flex items-center">
            <wwEditorInputTextSelect
                class="w-100"
                placeholder="Select an index"
                required
                :model-value="index"
                :options="indexesOptions"
                @update:modelValue="setIndex"
            />
            <button type="button" class="ww-editor-button -primary -small -icon ml-2" @click="fetchIndexes">
                <wwEditorIcon name="refresh" medium />
            </button>
        </div>
    </wwEditorFormRow>
    <wwEditorInputRow
        label="Search"
        type="query"
        placeholder="Enter a value"
        required
        bindable
        :model-value="search"
        @update:modelValue="setSearch"
    />
    <div class="flex items-center">
        <div class="w-100">
            <wwEditorInputRow
                label="Page"
                type="number"
                placeholder="Default: 0"
                bindable
                :model-value="page"
                @update:modelValue="setPage"
            />
        </div>
        <div class="m-2"></div>
        <div class="w-100">
            <wwEditorInputRow
                label="Limit"
                type="number"
                placeholder="Default: 20"
                :model-value="limit"
                @update:modelValue="setLimit"
            />
        </div>
    </div>
    <wwLoader :loading="isLoading" />
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Object, default: () => {} },
    },
    emits: ['update:args'],
    data() {
        return {
            indexes: [],
            isLoading: false,
        };
    },
    computed: {
        index() {
            return this.args.index;
        },
        search() {
            return this.args.search;
        },
        page() {
            return this.args.page;
        },
        limit() {
            return this.args.limit;
        },
        indexesOptions() {
            return this.indexes.map(({ name }) => ({ label: name, value: name }));
        },
    },
    mounted() {
        this.indexes = this.plugin.indexes || [];
    },
    methods: {
        setIndex(index) {
            this.$emit('update:args', { ...this.args, index });
        },
        setSearch(search) {
            this.$emit('update:args', { ...this.args, search });
        },
        setPage(page) {
            this.$emit('update:args', { ...this.args, page });
        },
        setLimit(limit) {
            this.$emit('update:args', { ...this.args, limit });
        },
        async fetchIndexes() {
            try {
                this.isLoading = true;
                await this.plugin.fetchIndexes();
                this.indexes = this.plugin.indexes || [];
            } catch (err) {
                wwLib.wwLog.error(err);
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>
