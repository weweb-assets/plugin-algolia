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
    <wwEditorInputRow
        v-if="database.searchParameters.includes('facetFilters')"
        label="Facet filters"
        type="array"
        :model-value="database.facetFilters"
        bindable
        @update:modelValue="setProp('facetFilters', $event)"
        @add-item="setProp('facetFilters', [...database.facetFilters, ''])"
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
        v-if="database.searchParameters.includes('optionalFilters')"
        label="Optional filters"
        type="array"
        :model-value="database.optionalFilters"
        bindable
        @update:modelValue="setProp('optionalFilters', $event)"
        @add-item="setProp('optionalFilters', [...database.optionalFilters, ''])"
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
        v-if="database.searchParameters.includes('numericFilters')"
        label="Numeric filters"
        type="array"
        :model-value="database.numericFilters"
        bindable
        @update:modelValue="setProp('numericFilters', $event)"
        @add-item="setProp('numericFilters', [...database.numericFilters, ''])"
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
        v-if="database.searchParameters.includes('tagFilters')"
        label="Tag filters"
        type="array"
        :model-value="database.tagFilters"
        bindable
        @update:modelValue="setProp('tagFilters', $event)"
        @add-item="setProp('tagFilters', [...database.tagFilters, ''])"
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
        v-if="database.searchParameters.includes('sumOrFiltersScores')"
        label="Sum or filters scores"
        type="boolean"
        bindable
        small
        :model-value="database.sumOrFiltersScores"
        @update:modelValue="setProp('sumOrFiltersScores', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('facets')"
        label="Facets"
        type="array"
        :model-value="database.facets"
        bindable
        @update:modelValue="setProp('facets', $event)"
        @add-item="setProp('facets', [...database.facets, ''])"
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
        v-if="database.searchParameters.includes('facetingAfterDistinct')"
        label="Faceting after distinct"
        type="boolean"
        bindable
        small
        :model-value="database.facetingAfterDistinct"
        @update:modelValue="setProp('facetingAfterDistinct', $event)"
    />
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
        v-if="database.searchParameters.includes('attributesToHighlight')"
        label="Attributes to highlight"
        type="array"
        :model-value="database.attributesToHighlight"
        bindable
        @update:modelValue="setProp('attributesToHighlight', $event)"
        @add-item="setProp('attributesToHighlight', [...database.attributesToHighlight, ''])"
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
        v-if="database.searchParameters.includes('attributesToSnippet')"
        label="Attributes to snippet"
        type="array"
        :model-value="database.attributesToSnippet"
        bindable
        @update:modelValue="setProp('attributesToSnippet', $event)"
        @add-item="setProp('attributesToSnippet', [...database.attributesToSnippet, ''])"
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
        v-if="database.searchParameters.includes('highlightPreTag')"
        label="Highlight pre tag"
        type="query"
        placeholder="Enter a value"
        bindable
        small
        :model-value="database.highlightPreTag"
        @update:modelValue="setProp('highlightPreTag', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('highlightPostTag')"
        label="Highlight post tag"
        type="query"
        placeholder="Enter a value"
        bindable
        small
        :model-value="database.highlightPostTag"
        @update:modelValue="setProp('highlightPostTag', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('snippetEllipsisText')"
        label="Snippet ellipsis text"
        type="query"
        placeholder="Enter a value"
        bindable
        small
        :model-value="database.snippetEllipsisText"
        @update:modelValue="setProp('snippetEllipsisText', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('restrictHighlightAndSnippetArrays')"
        label="Restrict highlight and snippet arrays"
        type="boolean"
        bindable
        small
        :model-value="database.restrictHighlightAndSnippetArrays"
        @update:modelValue="setProp('restrictHighlightAndSnippetArrays', $event)"
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
                { title: 'Attributes', label: 'Attributes to retrieve', value: 'attributesToRetrieve' },
                { label: 'Restrict searchable attributes', value: 'restrictSearchableAttributes' },
                { title: 'Ranking', label: 'Relevancy strictness', value: 'relevancyStrictness' },
                { title: 'Filtering', label: 'Filters', value: 'filters' },
                { label: 'Facet filters', value: 'facetFilters' },
                { label: 'Optional filters', value: 'optionalFilters' },
                { label: 'Numeric filters', value: 'numericFilters' },
                { label: 'Tag filters', value: 'tagFilters' },
                { label: 'Sum or filters scores', value: 'sumOrFiltersScores' },
                { title: 'Faceting', label: 'Facets', value: 'facets' },
                { label: 'Max values per facet', value: 'maxValuesPerFacet' },
                { label: 'Faceting after distinct', value: 'facetingAfterDistinct' },
                { label: 'Sort facet values by', value: 'sortFacetValuesBy' },
                { title: 'Highlighting snippeting', label: 'Attributes to highlight', value: 'attributesToHighlight' },
                { label: 'Attributes to snippet', value: 'attributesToSnippet' },
                { label: 'Highlight pre tag', value: 'highlightPreTag' },
                { label: 'Highlight post tag', value: 'highlightPostTag' },
                { label: 'Snippet ellipsis text', value: 'snippetEllipsisText' },
                { label: 'Restrict Highlight and snippet arrays', value: 'restrictHighlightAndSnippetArrays' },
                { title: 'typos', label: 'TODO: minWordSizefor1Typo', value: 'minWordSizefor1Typo' },
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
                relevancyStrictness: 100,
                filters: '',
                facetFilters: [],
                optionalFilters: [],
                numericFilters: [],
                tagFilters: [],
                sumOrFiltersScores: false,
                facets: [],
                maxValuesPerFacet: 100,
                facetingAfterDistinct: false,
                sortFacetValuesBy: '',
                attributesToHighlight: [],
                attributesToSnippet: [],
                highlightPreTag: '',
                highlightPostTag: '',
                snippetEllipsisText: '...',
                restrictHighlightAndSnippetArrays: false,
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
