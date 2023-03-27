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
    <wwEditorInputRow
        label="Search Parameters"
        type="select"
        multiple
        :options="searchParametersOptions"
        :model-value="database.searchParameters"
        placeholder="Select parameters"
        @update:modelValue="setProp('searchParameters', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('attributesToRetrieve')"
        label="Attributes to retrieve"
        type="array"
        :model-value="database.attributesToRetrieve"
        bindable
        @update:modelValue="setProp('attributesToRetrieve', $event)"
        @add-item="setProp('attributesToRetrieve', [...database.attributesToRetrieve, ''])"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                placeholder="Enter a value"
                type="query"
                :model-value="item"
                @update:modelValue="setItem"
                bindable
                small
            />
        </template>
    </wwEditorInputRow>
    <wwEditorInputRow
        v-if="database.searchParameters.includes('restrictSearchableAttributes')"
        label="Restrict searchable attributes"
        type="array"
        :model-value="database.restrictSearchableAttributes"
        bindable
        @update:modelValue="setProp('restrictSearchableAttributes', $event)"
        @add-item="setProp('restrictSearchableAttributes', [...database.restrictSearchableAttributes, ''])"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                placeholder="Enter a value"
                type="query"
                :model-value="item"
                @update:modelValue="setItem"
                bindable
                small
            />
        </template>
    </wwEditorInputRow>
    <wwEditorInputRow
        v-if="database.searchParameters.includes('filters')"
        label="Filters"
        type="query"
        placeholder="Enter a value"
        bindable
        small
        :model-value="database.filters"
        @update:modelValue="setProp('filters', $event)"
    />
    <wwEditorFormRow label="Relevancy strictness" v-if="database.searchParameters.includes('relevancyStrictness')">
        <div class="flex items-center">
            <wwEditorInput
                label="Enter a value"
                type="number"
                min="0"
                max="100"
                :model-value="database.relevancyStrictness"
                @update:modelValue="setProp('relevancyStrictness', $event)"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isBound(database.relevancyStrictness)"
                class="ml-2"
                min="0"
                max="100"
                :model-value="database.relevancyStrictness"
                @update:modelValue="setProp('relevancyStrictness', $event)"
            />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Max values per facet" v-if="database.searchParameters.includes('maxValuesPerFacet')">
        <div class="flex items-center">
            <wwEditorInput
                label="Enter a value"
                type="number"
                min="1"
                max="1000"
                :model-value="database.maxValuesPerFacet"
                @update:modelValue="setProp('maxValuesPerFacet', $event)"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isBound(database.maxValuesPerFacet)"
                class="ml-2"
                min="1"
                max="1000"
                :model-value="database.maxValuesPerFacet"
                @update:modelValue="setProp('maxValuesPerFacet', $event)"
            />
        </div>
    </wwEditorFormRow>
    <wwEditorInputRow
        v-if="database.searchParameters.includes('sortFacetValuesBy')"
        label="Sort facet values by"
        type="query"
        placeholder="Enter a value"
        bindable
        small
        :model-value="database.sortFacetValuesBy"
        @update:modelValue="setProp('sortFacetValuesBy', $event)"
    />
    <wwEditorInputRow
        label="Result key"
        type="query"
        :model-value="database.resultKey"
        placeholder="result.key"
        small
        @update:modelValue="setProp('resultKey', $event)"
    />
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
            searchParametersOptions: [
                { label: 'Attributes to retrieve', value: 'attributesToRetrieve' },
                { label: 'Restrict searchable attributes', value: 'restrictSearchableAttributes' },
                { label: 'Relevancy strictness', value: 'relevancyStrictness' },
                { label: 'Filters', value: 'filters' },
                { label: 'TODO: facetFilters', value: 'facetFilters' },
                { label: 'TODO: optionalFilters', value: 'optionalFilters' },
                { label: 'TODO: numericFilters', value: 'numericFilters' },
                { label: 'TODO: tagFilters', value: 'tagFilters' },
                { label: 'TODO: sumOrFiltersScores', value: 'sumOrFiltersScores' },
                { label: 'TODO: facets', value: 'facets' },
                { label: 'Max values per facet', value: 'maxValuesPerFacet' },
                { label: 'TODO: facetingAfterDistinct', value: 'facetingAfterDistinct' },
                { label: 'Sort facet values by', value: 'sortFacetValuesBy' },
                { label: 'TODO: attributesToHighlight', value: 'attributesToHighlight' },
                { label: 'TODO: attributesToSnippet', value: 'attributesToSnippet' },
                { label: 'TODO: highlightPreTag', value: 'highlightPreTag' },
                { label: 'TODO: highlightPostTag', value: 'highlightPostTag' },
                { label: 'TODO: snippetEllipsisText', value: 'snippetEllipsisText' },
                { label: 'TODO: restrictHighlightAndSnippetArrays', value: 'restrictHighlightAndSnippetArrays' },
                { label: 'TODO: minWordSizefor1Typo', value: 'minWordSizefor1Typo' },
                { label: 'TODO: minWordSizefor2Typos', value: 'minWordSizefor2Typos' },
                { label: 'TODO: typoTolerance', value: 'typoTolerance' },
                { label: 'TODO: allowTyposOnNumericTokens', value: 'allowTyposOnNumericTokens' },
                { label: 'TODO: disableTypoToleranceOnAttributes', value: 'disableTypoToleranceOnAttributes' },
            ],
        };
    },
    computed: {
        database() {
            return {
                index: null,
                search: null,
                searchParameters: [],
                attributesToRetrieve: [],
                restrictSearchableAttributes: [],
                filters: '',
                relevancyStrictness: 100,
                maxValuesPerFacet: 100,
                sortFacetValuesBy: '',
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
        isBound(value) {
            return typeof value === 'object';
        },
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
