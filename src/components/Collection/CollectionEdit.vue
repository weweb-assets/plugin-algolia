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
            <wwEditorFormRow>
                <wwEditorInput
                    label="Attribute to retrieve"
                    placeholder="Enter a value"
                    type="query"
                    :model-value="item"
                    @update:modelValue="setItem"
                    bindable
                    small
                />
            </wwEditorFormRow>
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
            <wwEditorFormRow>
                <wwEditorInput
                    label="Restrict searchable attribute"
                    placeholder="Enter a value"
                    type="query"
                    :model-value="item"
                    @update:modelValue="setItem"
                    bindable
                    small
                />
            </wwEditorFormRow>
        </template>
    </wwEditorInputRow>
    <wwEditorFormRow label="Relevancy strictness" v-if="database.searchParameters.includes('relevancyStrictness')">
        <div class="flex items-center">
            <wwEditorInput
                label="Relevancy strictness"
                placeholder="Enter a value"
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
            <wwEditorFormRow>
                <wwEditorInput
                    label="Facet filter"
                    placeholder="Enter a value"
                    type="query"
                    :model-value="item"
                    @update:modelValue="setItem"
                    bindable
                    small
                />
            </wwEditorFormRow>
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
            <wwEditorFormRow>
                <wwEditorInput
                    label="Optional filter"
                    placeholder="Enter a value"
                    type="query"
                    :model-value="item"
                    @update:modelValue="setItem"
                    bindable
                    small
                />
            </wwEditorFormRow>
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
            <wwEditorFormRow>
                <wwEditorInput
                    label="Numeric filter"
                    placeholder="Enter a value"
                    type="query"
                    :model-value="item"
                    @update:modelValue="setItem"
                    bindable
                    small
                />
            </wwEditorFormRow>
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
            <wwEditorFormRow>
                <wwEditorInput
                    label="Tag filter"
                    placeholder="Enter a value"
                    type="query"
                    :model-value="item"
                    @update:modelValue="setItem"
                    bindable
                    small
                />
            </wwEditorFormRow>
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
            <wwEditorFormRow>
                <wwEditorInput
                    label="Facet"
                    placeholder="Enter a value"
                    type="query"
                    :model-value="item"
                    @update:modelValue="setItem"
                    bindable
                    small
                />
            </wwEditorFormRow>
        </template>
    </wwEditorInputRow>
    <wwEditorFormRow label="Max values per facet" v-if="database.searchParameters.includes('maxValuesPerFacet')">
        <div class="flex items-center">
            <wwEditorInput
                label="Max values per facet"
                placeholder="Enter a value"
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
    <wwEditorFormRow v-if="database.searchParameters.includes('sortFacetValuesBy')" label="Sort facet values by">
        <wwEditorInputRadio
            :choices="sortFacetValuesByChoices"
            :model-value="database.sortFacetValuesBy"
            @update:modelValue="setProp('sortFacetValuesBy', $event)"
            bindable
            small
        />
    </wwEditorFormRow>
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
            <wwEditorFormRow>
                <wwEditorInput
                    label="Attribute to highlight"
                    placeholder="Enter a value"
                    type="query"
                    :model-value="item"
                    @update:modelValue="setItem"
                    bindable
                    small
                />
            </wwEditorFormRow>
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
            <wwEditorFormRow>
                <wwEditorInput
                    label="Attribute to snippet"
                    placeholder="Enter a value"
                    type="query"
                    :model-value="item"
                    @update:modelValue="setItem"
                    bindable
                    small
                />
            </wwEditorFormRow>
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
        v-if="database.searchParameters.includes('restrictHighlightAndSnippetArrays')"
        label="Restrict highlight and snippet arrays"
        type="boolean"
        bindable
        small
        :model-value="database.restrictHighlightAndSnippetArrays"
        @update:modelValue="setProp('restrictHighlightAndSnippetArrays', $event)"
    />
    <wwEditorFormRow label="Min word size for 1 typo" v-if="database.searchParameters.includes('minWordSizefor1Typo')">
        <div class="flex items-center">
            <wwEditorInput
                label="Min word size for 1 typo"
                placeholder="Enter a value"
                type="number"
                min="1"
                max="100"
                :model-value="database.minWordSizefor1Typo"
                @update:modelValue="setProp('minWordSizefor1Typo', $event)"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isBound(database.minWordSizefor1Typo)"
                class="ml-2"
                min="1"
                max="100"
                :model-value="database.minWordSizefor1Typo"
                @update:modelValue="setProp('minWordSizefor1Typo', $event)"
            />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow
        label="Min word size for 2 typos"
        v-if="database.searchParameters.includes('minWordSizefor2Typos')"
    >
        <div class="flex items-center">
            <wwEditorInput
                label="Min word size for 2 typos"
                placeholder="Enter a value"
                type="number"
                min="1"
                max="100"
                :model-value="database.minWordSizefor2Typos"
                @update:modelValue="setProp('minWordSizefor2Typos', $event)"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isBound(database.minWordSizefor2Typos)"
                class="ml-2"
                min="1"
                max="100"
                :model-value="database.minWordSizefor2Typos"
                @update:modelValue="setProp('minWordSizefor2Typos', $event)"
            />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow v-if="database.searchParameters.includes('typoTolerance')" label="Typo tolerance">
        <wwEditorInputRadio
            :choices="typoToleranceChoices"
            :model-value="database.typoTolerance"
            @update:modelValue="setProp('typoTolerance', $event)"
            bindable
            small
        />
    </wwEditorFormRow>
    <wwEditorInputRow
        v-if="database.searchParameters.includes('allowTyposOnNumericTokens')"
        label="Allow typos on numeric tokens"
        type="boolean"
        bindable
        small
        :model-value="database.allowTyposOnNumericTokens"
        @update:modelValue="setProp('allowTyposOnNumericTokens', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('disableTypoToleranceOnAttributes')"
        label="Disable typo tolerance on attributes"
        type="array"
        :model-value="database.disableTypoToleranceOnAttributes"
        bindable
        @update:modelValue="setProp('disableTypoToleranceOnAttributes', $event)"
        @add-item="setProp('disableTypoToleranceOnAttributes', [...database.disableTypoToleranceOnAttributes, ''])"
    >
        <template #default="{ item, setItem }">
            <wwEditorFormRow>
                <wwEditorInput
                    label="Disable typo tolerance on attribute"
                    placeholder="Enter a value"
                    type="query"
                    :model-value="item"
                    @update:modelValue="setItem"
                    bindable
                    small
                />
            </wwEditorFormRow>
        </template>
    </wwEditorInputRow>
    <wwEditorInputRow
        v-if="database.searchParameters.includes('aroundLatLng')"
        label="Around lat lng"
        type="query"
        :model-value="database.aroundLatLng"
        placeholder="latitude, longitude"
        small
        @update:modelValue="setProp('aroundLatLng', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('aroundLatLngViaIP')"
        label="Around lat lng via IP"
        type="boolean"
        bindable
        small
        :model-value="database.aroundLatLngViaIP"
        @update:modelValue="setProp('aroundLatLngViaIP', $event)"
    />
    <wwEditorFormRow label="Around radius" v-if="database.searchParameters.includes('aroundRadius')">
        <div class="flex items-center">
            <wwEditorInput
                label="Around radius"
                placeholder="Enter a value in meters"
                type="number"
                min="1"
                max="100000"
                :model-value="database.aroundRadius"
                @update:modelValue="setProp('aroundRadius', $event)"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isBound(database.aroundRadius)"
                class="ml-2"
                min="1"
                max="100000"
                :model-value="database.aroundRadius"
                @update:modelValue="setProp('aroundRadius', $event)"
            />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Around precision" v-if="database.searchParameters.includes('aroundPrecision')">
        <div class="flex items-center">
            <wwEditorInput
                label="Around precision"
                placeholder="Enter a value in meters"
                type="number"
                min="1"
                max="1000"
                :model-value="database.aroundPrecision"
                @update:modelValue="setProp('aroundPrecision', $event)"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isBound(database.aroundPrecision)"
                class="ml-2"
                min="1"
                max="1000"
                :model-value="database.aroundPrecision"
                @update:modelValue="setProp('aroundPrecision', $event)"
            />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Minimum around radius" v-if="database.searchParameters.includes('minimumAroundRadius')">
        <div class="flex items-center">
            <wwEditorInput
                label="Minimum around radius"
                placeholder="Enter a value in meters"
                type="number"
                min="1"
                max="10000"
                :model-value="database.minimumAroundRadius"
                @update:modelValue="setProp('minimumAroundRadius', $event)"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isBound(database.minimumAroundRadius)"
                class="ml-2"
                min="1"
                max="10000"
                :model-value="database.minimumAroundRadius"
                @update:modelValue="setProp('minimumAroundRadius', $event)"
            />
        </div>
    </wwEditorFormRow>
    <wwEditorInputRow
        v-if="database.searchParameters.includes('insideBoundingBox')"
        label="Inside bounding box"
        type="array"
        :model-value="database.insideBoundingBox"
        bindable
        @update:modelValue="setProp('insideBoundingBox', $event)"
        @add-item="setProp('insideBoundingBox', [...database.insideBoundingBox, []])"
    >
        <template #default="{ item, setItem }">
            <div class="flex items-center w-100">
                <wwEditorInputRow
                    class="w-100"
                    label="Point 1 lat"
                    placeholder="Enter a value"
                    type="number"
                    :model-value="item[0]"
                    @update:modelValue="setItem([$event, item[1], item[2], item[3]])"
                    bindable
                    small
                />
                <wwEditorInputRow
                    class="w-100"
                    label="Point 1 lng"
                    placeholder="Enter a value"
                    type="number"
                    :model-value="item[1]"
                    @update:modelValue="setItem([item[0], $event, item[2], item[3]])"
                    bindable
                    small
                />
            </div>
            <div class="flex items-center w-100">
                <wwEditorInputRow
                    class="w-100"
                    label="Point 2 lat"
                    placeholder="Enter a value"
                    type="number"
                    :model-value="item[2]"
                    @update:modelValue="setItem([item[0], item[1], $event, item[3]])"
                    bindable
                    small
                />
                <wwEditorInputRow
                    class="w-100"
                    label="Point 2 lng"
                    placeholder="Enter a value"
                    type="number"
                    :model-value="item[3]"
                    @update:modelValue="setItem([item[0], item[1], item[2], $event])"
                    bindable
                    small
                />
            </div>
        </template>
    </wwEditorInputRow>
    <wwEditorInputRow
        v-if="database.searchParameters.includes('insidePolygon')"
        label="Inside polygon"
        type="array"
        :model-value="database.insidePolygon"
        bindable
        @update:modelValue="setProp('insidePolygon', $event)"
        @add-item="setProp('insidePolygon', [...database.insidePolygon, []])"
    >
        <template #default="{ index, item, setItem }">
            <wwEditorInputRow
                type="array"
                :label="`Polygon ${index + 1}`"
                :model-value="item"
                bindable
                @update:modelValue="setItem"
                @add-item="setItem([...item, null])"
            >
                <template #default="{ index: subIndex, item: subItem, setItem: setSubItem }">
                    <wwEditorInputRow
                        :label="`Point ${parseInt(subIndex / 2) + 1} ${!(subIndex % 2) ? 'lat' : 'lng'}`"
                        placeholder="Enter a value"
                        type="number"
                        :model-value="subItem"
                        @update:modelValue="setSubItem($event)"
                        bindable
                        small
                    />
                </template>
            </wwEditorInputRow>
        </template>
    </wwEditorInputRow>
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
                { label: 'Restrict highlight and snippet arrays', value: 'restrictHighlightAndSnippetArrays' },
                { title: 'Typos', label: 'Min word size for 1 typo', value: 'minWordSizefor1Typo' },
                { label: 'Min word size for 2 typos', value: 'minWordSizefor2Typos' },
                { label: 'Typo tolerance', value: 'typoTolerance' },
                { label: 'Allow typos on numeric tokens', value: 'allowTyposOnNumericTokens' },
                { label: 'Disable typo tolerance on attributes', value: 'disableTypoToleranceOnAttributes' },
                { title: 'Geo search', label: 'Around lat lng', value: 'aroundLatLng' },
                { label: 'Around lat lng via IP', value: 'aroundLatLngViaIP' },
                { label: 'Around radius', value: 'aroundRadius' },
                { label: 'Around precision', value: 'aroundPrecision' },
                { label: 'Minimum around radius', value: 'minimumAroundRadius' },
                { label: 'Inside bounding box', value: 'insideBoundingBox' },
                { label: 'Inside polygon', value: 'insidePolygon' },
                // { title: 'Languages', label: 'Ignore plurals', value: 'ignorePlurals' },
                // { label: 'Remove stop words', value: 'removeStopWords' },
                // { label: 'Query languages', value: 'queryLanguages' },
                // { label: 'Natural languages', value: 'naturalLanguages' },
                // { label: 'Decompound query', value: 'decompoundQuery' },
                // { title: 'Rules', label: 'Enable rules', value: 'enableRules' },
                // { label: 'Rule contexts', value: 'ruleContexts' },
                // { title: 'Personalization', label: 'Enable personalization', value: 'enablePersonalization' },
                // { label: 'Personalization impact', value: 'personalizationImpact' },
                // { label: 'User token', value: 'userToken' },
                // { title: 'Query strategy', label: 'Query type', value: 'queryType' },
                // { label: 'Remove words if no results', value: 'removeWordsIfNoResults' },
                // { label: 'Advanced syntax', value: 'advancedSyntax' },
                // { label: 'Optional words', value: 'optionalWords' },
                // { label: 'Disable exact on attributes', value: 'disableExactOnAttributes' },
                // { label: 'Exact on single word query', value: 'exactOnSingleWordQuery' },
                // { label: 'Alternatives as exact', value: 'alternativesAsExact' },
                // { label: 'Advanced syntax features', value: 'advancedSyntaxFeatures' },
                // { title: 'Advanced', label: 'Distinct', value: 'distinct' },
                // { label: 'Get ranking info', value: 'getRankingInfo' },
                // { label: 'Click analytics', value: 'clickAnalytics' },
                // { label: 'Analytics', value: 'analytics' },
                // { label: 'Analytics tags', value: 'analyticsTags' },
                // { label: 'Synonyms', value: 'synonyms' },
                // { label: 'Replace synonyms in highlight', value: 'replaceSynonymsInHighlight' },
                // { label: 'Min proximity', value: 'minProximity' },
                // { label: 'Response fields', value: 'responseFields' },
                // { label: 'Max facet hits', value: 'maxFacetHits' },
                // { label: 'Percentile computation', value: 'percentileComputation' },
                // {
                //     label: 'Attribute criteria computed by min proximity',
                //     value: 'attributeCriteriaComputedByMinProximity',
                // },
                // { label: 'Enable AB test', value: 'enableABTest' },
                // { label: 'Enable re-ranking', value: 'enableReRanking' },
            ],
            typoToleranceChoices: [
                { label: 'True', value: true },
                { label: 'False', value: false },
                { label: 'min', value: 'min' },
                { label: 'strict', value: 'strict' },
            ],
            sortFacetValuesByChoices: [
                { label: 'Count', value: 'count' },
                { label: 'Alpha', value: 'alpha' },
            ],
        };
    },
    computed: {
        database() {
            return {
                index: null,
                search: null,
                searchParameters: [],
                attributesToRetrieve: ['*'],
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
                sortFacetValuesBy: 'count',
                attributesToHighlight: [],
                attributesToSnippet: [],
                highlightPreTag: '<em>',
                highlightPostTag: '</em>',
                snippetEllipsisText: '...',
                restrictHighlightAndSnippetArrays: false,
                minWordSizefor1Typo: 4,
                minWordSizefor2Typos: 8,
                typoTolerance: true,
                allowTyposOnNumericTokens: true,
                disableTypoToleranceOnAttributes: [],
                aroundLatLng: '',
                aroundLatLngViaIP: false,
                aroundRadius: 1000,
                aroundPrecision: 10,
                minimumAroundRadius: 10,
                insideBoundingBox: [[]],
                insidePolygon: [[]],
                // ignorePlurals: true || false || [''],
                // removeStopWords: true || false || [''],
                // queryLanguages: [],
                // naturalLanguages: [],
                // decompoundQuery: true,
                // enableRules: true,
                // ruleContexts: [],
                // enablePersonalization: false,
                // personalizationImpact: 100,
                // userToken: null,
                // queryType: 'prefixLast',
                // removeWordsIfNoResults: 'none',
                // advancedSyntax: false,
                // optionalWords: [],
                // disableExactOnAttributes: [],
                // exactOnSingleWordQuery: 'attribute',
                // alternativesAsExact: ['ignorePlurals', 'singleWordSynonym'],
                // advancedSyntaxFeatures: ['exactPhrase', 'excludeWords'],
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
