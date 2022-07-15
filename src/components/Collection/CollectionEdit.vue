<template>
    <div class="flex items-center">
        <div class="w-100 -full">
            <wwEditorInputRow
                label="Index"
                type="select"
                placeholder="Select an index"
                required
                :model-value="database.index"
                :options="indexesOptions"
                @update:modelValue="setProp('index', $event)"
            />
        </div>
        <button type="button" class="ww-editor-button -small -primary ml-2 mt-3" @click="fetchIndexes">refresh</button>
    </div>
    <wwEditorInputRow
        label="Search"
        type="query"
        placeholder="Enter a value"
        required
        bindable
        :model-value="database.search"
        @update:modelValue="setProp('search', $event)"
    />
    <div class="flex items-center">
        <div class="w-100">
            <wwEditorInputRow
                label="Page"
                type="number"
                placeholder="Default: 0"
                bindable
                :model-value="database.page"
                @update:modelValue="setProp('page', $event)"
            />
        </div>
        <div class="m-2"></div>
        <div class="w-100">
            <wwEditorInputRow
                label="Limit"
                type="number"
                placeholder="Default: 20"
                :model-value="database.limit"
                @update:modelValue="setProp('limit', $event)"
            />
        </div>
    </div>
    <wwLoader :loading="isLoading" />
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        collection: { type: Object, required: true },
        config: { type: Object, required: true },
    },
    emits: ['update:config'],
    data() {
        return {
            isLoading: false,
            indexes: [],
        };
    },
    computed: {
        database() {
            return {
                index: null,
                search: null,
                ...this.config,
            };
        },
        indexesOptions() {
            return this.indexes.map(({ name }) => ({ label: name, value: name }));
        },
    },
    mounted() {
        this.indexes = this.plugin.indexes || [];
    },
    methods: {
        setProp(key, value) {
            this.$emit('update:config', { ...this.database, [key]: value });
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
