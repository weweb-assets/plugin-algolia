<template>
    <wwEditorFormRow label="Index" required class="-full">
        <div class="flex items-center">
            <wwEditorInput
                type="select"
                placeholder="Select an index"
                required
                :model-value="database.index"
                :options="indexesOptions"
                @update:modelValue="setProp('index', $event)"
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
    <wwEditorFormRow label="Page" v-if="database.searchParameters.includes('page')">
        <div class="flex items-center">
            <wwEditorInput
                label="Page"
                placeholder="Enter a value"
                type="number"
                min="0"
                max="100"
                :model-value="database.page"
                @update:modelValue="setProp('page', $event)"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isBound(database.page)"
                class="ml-2"
                min="0"
                max="100"
                :model-value="database.page"
                @update:modelValue="setProp('page', $event)"
            />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Hits per page" v-if="database.searchParameters.includes('hitsPerPage')">
        <div class="flex items-center">
            <wwEditorInput
                label="Hits per page"
                placeholder="Enter a value"
                type="number"
                min="1"
                max="100"
                :model-value="database.hitsPerPage"
                @update:modelValue="setProp('hitsPerPage', $event)"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isBound(database.hitsPerPage)"
                class="ml-2"
                min="1"
                max="100"
                :model-value="database.hitsPerPage"
                @update:modelValue="setProp('hitsPerPage', $event)"
            />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Offset" v-if="database.searchParameters.includes('offset')">
        <div class="flex items-center">
            <wwEditorInput
                label="Offset"
                placeholder="Enter a value"
                type="number"
                min="0"
                max="100"
                :model-value="database.offset"
                @update:modelValue="setProp('offset', $event)"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isBound(database.offset)"
                class="ml-2"
                min="0"
                max="100"
                :model-value="database.offset"
                @update:modelValue="setProp('offset', $event)"
            />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Length" v-if="database.searchParameters.includes('length')">
        <div class="flex items-center">
            <wwEditorInput
                label="Length"
                placeholder="Enter a value"
                type="number"
                min="1"
                max="100"
                :model-value="database.length"
                @update:modelValue="setProp('length', $event)"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isBound(database.length)"
                class="ml-2"
                min="1"
                max="100"
                :model-value="database.length"
                @update:modelValue="setProp('length', $event)"
            />
        </div>
    </wwEditorFormRow>
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
        v-if="database.searchParameters.includes('ignorePlurals')"
        label="Ignore plurals"
        type="select"
        multiple
        bindable
        small
        :options="ignorePluralsOptions"
        :model-value="database.ignorePlurals"
        placeholder="Select a value"
        @update:modelValue="setProp('ignorePlurals', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('removeStopWords')"
        label="Remove stop words"
        type="select"
        multiple
        bindable
        small
        :options="removeStopWordsOptions"
        :model-value="database.removeStopWords"
        placeholder="Select a value"
        @update:modelValue="setProp('removeStopWords', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('queryLanguages')"
        label="Query languages"
        type="select"
        multiple
        bindable
        small
        :options="queryLanguagesOptions"
        :model-value="database.queryLanguages"
        placeholder="Select a value"
        @update:modelValue="setProp('queryLanguages', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('naturalLanguages')"
        label="Natural languages"
        type="select"
        multiple
        bindable
        small
        :options="naturalLanguagesOptions"
        :model-value="database.naturalLanguages"
        placeholder="Select a value"
        @update:modelValue="setProp('naturalLanguages', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('decompoundQuery')"
        label="Decompound query"
        type="boolean"
        bindable
        small
        :model-value="database.decompoundQuery"
        @update:modelValue="setProp('decompoundQuery', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('enableRules')"
        label="Enable rules"
        type="boolean"
        bindable
        small
        :model-value="database.enableRules"
        @update:modelValue="setProp('enableRules', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('ruleContexts')"
        label="Rule contexts"
        type="array"
        :model-value="database.ruleContexts"
        bindable
        @update:modelValue="setProp('ruleContexts', $event)"
        @add-item="setProp('ruleContexts', [...database.ruleContexts, ''])"
    >
        <template #default="{ item, setItem }">
            <wwEditorFormRow>
                <wwEditorInput
                    label="Rule context"
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
        v-if="database.searchParameters.includes('enablePersonalization')"
        label="Enable personalization"
        type="boolean"
        bindable
        small
        :model-value="database.enablePersonalization"
        @update:modelValue="setProp('enablePersonalization', $event)"
    />
    <wwEditorFormRow label="Personalization Impact" v-if="database.searchParameters.includes('personalizationImpact')">
        <div class="flex items-center">
            <wwEditorInput
                label="Personalization impact"
                placeholder="Enter a value"
                type="number"
                min="0"
                max="100"
                :model-value="database.personalizationImpact"
                @update:modelValue="setProp('personalizationImpact', $event)"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isBound(database.personalizationImpact)"
                class="ml-2"
                min="0"
                max="100"
                :model-value="database.personalizationImpact"
                @update:modelValue="setProp('personalizationImpact', $event)"
            />
        </div>
    </wwEditorFormRow>
    <wwEditorInputRow
        v-if="database.searchParameters.includes('userToken')"
        label="User token"
        type="query"
        placeholder="Enter a value"
        bindable
        small
        :model-value="database.userToken"
        @update:modelValue="setProp('userToken', $event)"
    />
    <wwEditorFormRow v-if="database.searchParameters.includes('queryType')" label="Query type">
        <wwEditorInputRadio
            :choices="queryTypeChoices"
            :model-value="database.queryType"
            @update:modelValue="setProp('queryType', $event)"
            bindable
            small
        />
    </wwEditorFormRow>
    <wwEditorFormRow
        v-if="database.searchParameters.includes('removeWordsIfNoResults')"
        label="Remove words if no results"
    >
        <wwEditorInputRadio
            :choices="removeWordsIfNoResultsChoices"
            :model-value="database.removeWordsIfNoResults"
            @update:modelValue="setProp('removeWordsIfNoResults', $event)"
            bindable
            small
        />
    </wwEditorFormRow>
    <wwEditorInputRow
        v-if="database.searchParameters.includes('advancedSyntax')"
        label="Advanced syntax"
        type="boolean"
        bindable
        small
        :model-value="database.advancedSyntax"
        @update:modelValue="setProp('advancedSyntax', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('optionalWords')"
        label="Optional words"
        type="array"
        :model-value="database.optionalWords"
        bindable
        @update:modelValue="setProp('optionalWords', $event)"
        @add-item="setProp('optionalWords', [...database.optionalWords, ''])"
    >
        <template #default="{ item, setItem }">
            <wwEditorFormRow>
                <wwEditorInput
                    label="Optional word"
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
        v-if="database.searchParameters.includes('disableExactOnAttributes')"
        label="Disable exact on attributes"
        type="array"
        :model-value="database.disableExactOnAttributes"
        bindable
        @update:modelValue="setProp('disableExactOnAttributes', $event)"
        @add-item="setProp('disableExactOnAttributes', [...database.disableExactOnAttributes, ''])"
    >
        <template #default="{ item, setItem }">
            <wwEditorFormRow>
                <wwEditorInput
                    label="Disable exact on attribute"
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
    <wwEditorFormRow
        v-if="database.searchParameters.includes('exactOnSingleWordQuery')"
        label="Exact on single word query"
    >
        <wwEditorInputRadio
            :choices="exactOnSingleWordQueryChoices"
            :model-value="database.exactOnSingleWordQuery"
            @update:modelValue="setProp('exactOnSingleWordQuery', $event)"
            bindable
            small
        />
    </wwEditorFormRow>
    <wwEditorInputRow
        v-if="database.searchParameters.includes('alternativesAsExact')"
        label="Alternatives as exact"
        type="select"
        multiple
        bindable
        small
        :options="alternativesAsExactOptions"
        :model-value="database.alternativesAsExact"
        placeholder="Select a value"
        @update:modelValue="setProp('alternativesAsExact', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('advancedSyntaxFeatures')"
        label="Advanced syntax features"
        type="select"
        multiple
        bindable
        small
        :options="advancedSyntaxFeaturesOptions"
        :model-value="database.advancedSyntaxFeatures"
        placeholder="Select a value"
        @update:modelValue="setProp('advancedSyntaxFeatures', $event)"
    />
    <wwEditorFormRow v-if="database.searchParameters.includes('distinct')" label="Distinct">
        <wwEditorInputRadio
            :choices="distinctChoices"
            :model-value="database.distinct"
            @update:modelValue="setProp('distinct', $event)"
            bindable
            small
        />
    </wwEditorFormRow>
    <wwEditorInputRow
        v-if="database.searchParameters.includes('getRankingInfo')"
        label="Get ranking info"
        type="boolean"
        bindable
        small
        :model-value="database.getRankingInfo"
        @update:modelValue="setProp('getRankingInfo', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('clickAnalytics')"
        label="Click analytics"
        type="boolean"
        bindable
        small
        :model-value="database.clickAnalytics"
        @update:modelValue="setProp('clickAnalytics', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('analytics')"
        label="Analytics"
        type="boolean"
        bindable
        small
        :model-value="database.analytics"
        @update:modelValue="setProp('analytics', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('analyticsTags')"
        label="Analytics tags"
        type="array"
        :model-value="database.analyticsTags"
        bindable
        @update:modelValue="setProp('analyticsTags', $event)"
        @add-item="setProp('analyticsTags', [...database.analyticsTags, ''])"
    >
        <template #default="{ item, setItem }">
            <wwEditorFormRow>
                <wwEditorInput
                    label="Analytics tag"
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
        v-if="database.searchParameters.includes('synonyms')"
        label="Synonyms"
        type="boolean"
        bindable
        small
        :model-value="database.synonyms"
        @update:modelValue="setProp('synonyms', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('replaceSynonymsInHighlight')"
        label="Replace synonyms in highlight"
        type="boolean"
        bindable
        small
        :model-value="database.replaceSynonymsInHighlight"
        @update:modelValue="setProp('replaceSynonymsInHighlight', $event)"
    />
    <wwEditorFormRow label="Min proximity" v-if="database.searchParameters.includes('minProximity')">
        <div class="flex items-center">
            <wwEditorInput
                label="Min proximity"
                placeholder="Enter a value"
                type="number"
                min="1"
                max="7"
                :model-value="database.minProximity"
                @update:modelValue="setProp('minProximity', $event)"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isBound(database.minProximity)"
                class="ml-2"
                min="1"
                max="7"
                :model-value="database.minProximity"
                @update:modelValue="setProp('minProximity', $event)"
            />
        </div>
    </wwEditorFormRow>
    <wwEditorInputRow
        v-if="database.searchParameters.includes('responseFields')"
        label="Response fields"
        type="array"
        :model-value="database.responseFields"
        bindable
        @update:modelValue="setProp('responseFields', $event)"
        @add-item="setProp('responseFields', [...database.responseFields, ''])"
    >
        <template #default="{ item, setItem }">
            <wwEditorFormRow>
                <wwEditorInput
                    label="Response field"
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
    <wwEditorFormRow label="Max facet hits" v-if="database.searchParameters.includes('maxFacetHits')">
        <div class="flex items-center">
            <wwEditorInput
                label="Max facet hits"
                placeholder="Enter a value"
                type="number"
                min="1"
                max="100"
                :model-value="database.maxFacetHits"
                @update:modelValue="setProp('maxFacetHits', $event)"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isBound(database.maxFacetHits)"
                class="ml-2"
                min="1"
                max="100"
                :model-value="database.maxFacetHits"
                @update:modelValue="setProp('maxFacetHits', $event)"
            />
        </div>
    </wwEditorFormRow>
    <wwEditorInputRow
        v-if="database.searchParameters.includes('percentileComputation')"
        label="Percentile computation"
        type="boolean"
        bindable
        small
        :model-value="database.percentileComputation"
        @update:modelValue="setProp('percentileComputation', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('attributeCriteriaComputedByMinProximity')"
        label="Attribute criteria computed by min proximity"
        type="boolean"
        bindable
        small
        :model-value="database.attributeCriteriaComputedByMinProximity"
        @update:modelValue="setProp('attributeCriteriaComputedByMinProximity', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('enableABTest')"
        label="Enable AB test"
        type="boolean"
        bindable
        small
        :model-value="database.enableABTest"
        @update:modelValue="setProp('enableABTest', $event)"
    />
    <wwEditorInputRow
        v-if="database.searchParameters.includes('enableReRanking')"
        label="Enable re-ranking"
        type="boolean"
        bindable
        small
        :model-value="database.enableReRanking"
        @update:modelValue="setProp('enableReRanking', $event)"
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
                { label: 'Restrict highlight and snippet arrays', value: 'restrictHighlightAndSnippetArrays' },
                { title: 'Pagination', label: 'Page', value: 'page' },
                { label: 'Hits per page', value: 'hitsPerPage' },
                { label: 'Offset', value: 'offset' },
                { label: 'Length', value: 'length' },
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
                { title: 'Languages', label: 'Ignore plurals', value: 'ignorePlurals' },
                { label: 'Remove stop words', value: 'removeStopWords' },
                { label: 'Query languages', value: 'queryLanguages' },
                { label: 'Natural languages', value: 'naturalLanguages' },
                { label: 'Decompound query', value: 'decompoundQuery' },
                { title: 'Rules', label: 'Enable rules', value: 'enableRules' },
                { label: 'Rule contexts', value: 'ruleContexts' },
                { title: 'Personalization', label: 'Enable personalization', value: 'enablePersonalization' },
                { label: 'Personalization impact', value: 'personalizationImpact' },
                { label: 'User token', value: 'userToken' },
                { title: 'Query strategy', label: 'Query type', value: 'queryType' },
                { label: 'Remove words if no results', value: 'removeWordsIfNoResults' },
                { label: 'Advanced syntax', value: 'advancedSyntax' },
                { label: 'Optional words', value: 'optionalWords' },
                { label: 'Disable exact on attributes', value: 'disableExactOnAttributes' },
                { label: 'Exact on single word query', value: 'exactOnSingleWordQuery' },
                { label: 'Alternatives as exact', value: 'alternativesAsExact' },
                { label: 'Advanced syntax features', value: 'advancedSyntaxFeatures' },
                { title: 'Advanced', label: 'Distinct', value: 'distinct' },
                { label: 'Get ranking info', value: 'getRankingInfo' },
                { label: 'Click analytics', value: 'clickAnalytics' },
                { label: 'Analytics', value: 'analytics' },
                { label: 'Analytics tags', value: 'analyticsTags' },
                { label: 'Synonyms', value: 'synonyms' },
                { label: 'Replace synonyms in highlight', value: 'replaceSynonymsInHighlight' },
                { label: 'Min proximity', value: 'minProximity' },
                { label: 'Response fields', value: 'responseFields' },
                { label: 'Max facet hits', value: 'maxFacetHits' },
                { label: 'Percentile computation', value: 'percentileComputation' },
                {
                    label: 'Attribute criteria computed by min proximity',
                    value: 'attributeCriteriaComputedByMinProximity',
                },
                { label: 'Enable AB test', value: 'enableABTest' },
                { label: 'Enable re-ranking', value: 'enableReRanking' },
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
            queryTypeChoices: [
                { label: 'Prefix last', value: 'prefixLast' },
                { label: 'Prefix all', value: 'prefixAll' },
                { label: 'Prefix none', value: 'prefixNone' },
            ],
            removeWordsIfNoResultsChoices: [
                { label: 'None', value: 'none' },
                { label: 'Last words', value: 'lastWords' },
                { label: 'First words', value: 'firstWords' },
                { label: 'All optional', value: 'allOptional' },
            ],
            exactOnSingleWordQueryChoices: [
                { label: 'Attribute', value: 'attribute' },
                { label: 'None', value: 'none' },
                { label: 'Word', value: 'word' },
            ],
            distinctChoices: [
                { label: '0', value: 0 },
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
            ],
            alternativesAsExactOptions: [
                { label: 'Ignore plurals', value: 'ignorePlurals' },
                { label: 'Single word synonym', value: 'singleWordSynonym' },
                { label: 'Multi words synonym', value: 'multiWordsSynonym' },
            ],
            advancedSyntaxFeaturesOptions: [
                { label: 'Exact phrase', value: 'exactPhrase' },
                { label: 'Exclude words', value: 'excludeWords' },
            ],
            ignorePluralsOptions: [
                { label: 'Arabic', value: 'ar' },
                { label: 'Azerbaijani', value: 'az' },
                { label: 'Bulgarian', value: 'bg' },
                { label: 'Catalan', value: 'ca' },
                { label: 'Czech', value: 'cs' },
                { label: 'Welsh', value: 'cy' },
                { label: 'Danish', value: 'da' },
                { label: 'German', value: 'de' },
                { label: 'English', value: 'en' },
                { label: 'Esperanto', value: 'eo' },
                { label: 'Spanish', value: 'es' },
                { label: 'Estonian', value: 'et' },
                { label: 'Basque', value: 'eu' },
                { label: 'Finnish', value: 'fi' },
                { label: 'Faroese', value: 'fo' },
                { label: 'French', value: 'fr' },
                { label: 'Galician', value: 'gl' },
                { label: 'Hebrew', value: 'he' },
                { label: 'Hindi', value: 'hi' },
                { label: 'Hungarian', value: 'hu' },
                { label: 'Armenian', value: 'hy' },
                { label: 'Indonesian', value: 'id' },
                { label: 'Icelandic', value: 'is' },
                { label: 'Italian', value: 'it' },
                { label: 'Japanese', value: 'ja' },
                { label: 'Georgian', value: 'ka' },
                { label: 'Kazakh', value: 'kk' },
                { label: 'Korean', value: 'ko' },
                { label: 'Kirghiz', value: 'ky' },
                { label: 'Lithuanian', value: 'lt' },
                { label: 'Maori', value: 'mi' },
                { label: 'Mongolian', value: 'mn' },
                { label: 'Marathi', value: 'mr' },
                { label: 'Malay', value: 'ms' },
                { label: 'Maltese', value: 'mt' },
                { label: 'Norwegian Bokmål', value: 'nb' },
                { label: 'Dutch', value: 'nl' },
                { label: 'Norwegian', value: 'no' },
                { label: 'Northern Sotho', value: 'ns' },
                { label: 'Polish', value: 'pl' },
                { label: 'Pashto', value: 'ps' },
                { label: 'Portuguese', value: 'pt' },
                { label: 'Quechua', value: 'qu' },
                { label: 'Romanian', value: 'ro' },
                { label: 'Russian', value: 'ru' },
                { label: 'Slovak', value: 'sk' },
                { label: 'Albanian', value: 'sq' },
                { label: 'Swedish', value: 'sv' },
                { label: 'Swahili', value: 'sw' },
                { label: 'Tamil', value: 'ta' },
                { label: 'Telugu', value: 'te' },
                { label: 'Tagalog', value: 'tl' },
                { label: 'Tswana', value: 'tn' },
                { label: 'Turkish', value: 'tr' },
                { label: 'Tatar', value: 'tt' },
                { label: 'Ukrainian', value: 'uk' },
                { label: 'Urdu', value: 'ur' },
                { label: 'Uzbek', value: 'uz' },
                { label: 'Chinese', value: 'zh' },
            ],
            queryLanguagesOptions: [
                { label: 'Arabic', value: 'ar' },
                { label: 'Bulgarian', value: 'bg' },
                { label: 'Bengali', value: 'bn' },
                { label: 'Catalan', value: 'ca' },
                { label: 'Czech', value: 'cs' },
                { label: 'Danish', value: 'da' },
                { label: 'German', value: 'de' },
                { label: 'Greek', value: 'el' },
                { label: 'English', value: 'en' },
                { label: 'Spanish', value: 'es' },
                { label: 'Basque', value: 'eu' },
                { label: 'Persian (Farsi)', value: 'fa' },
                { label: 'Finnish', value: 'fi' },
                { label: 'French', value: 'fr' },
                { label: 'Irish', value: 'ga' },
                { label: 'Galician', value: 'gl' },
                { label: 'Hindi', value: 'hi' },
                { label: 'Hungarian', value: 'hu' },
                { label: 'Armenian', value: 'hy' },
                { label: 'Indonesian', value: 'id' },
                { label: 'Italian', value: 'it' },
                { label: 'Japanese', value: 'ja' },
                { label: 'Korean', value: 'ko' },
                { label: 'Kurdish', value: 'ku' },
                { label: 'Lithuanian', value: 'lt' },
                { label: 'Latvian', value: 'lv' },
                { label: 'Marathi', value: 'mr' },
                { label: 'Dutch', value: 'nl' },
                { label: 'Norwegian', value: 'no' },
                { label: 'Polish', value: 'pl' },
                { label: 'Portuguese', value: 'pt' },
                { label: 'Brazilian', value: 'pt-br' },
                { label: 'Romanian', value: 'ro' },
                { label: 'Russian', value: 'ru' },
                { label: 'Slovak', value: 'sk' },
                { label: 'Swedish', value: 'sv' },
                { label: 'Thai', value: 'th' },
                { label: 'Turkish', value: 'tr' },
                { label: 'Ukranian', value: 'uk' },
                { label: 'Urdu', value: 'ur' },
                { label: 'Chinese', value: 'zh' },
            ],
            removeStopWordsOptions: [
                { label: 'Afrikaans', value: 'af' },
                { label: 'Arabic', value: 'ar' },
                { label: 'Azeri', value: 'az' },
                { label: 'Bulgarian', value: 'bg' },
                { label: 'Bengali', value: 'bn' },
                { label: 'Catalan', value: 'ca' },
                { label: 'Czech', value: 'cs' },
                { label: 'Welsh', value: 'cy' },
                { label: 'Danish', value: 'da' },
                { label: 'German', value: 'de' },
                { label: 'Greek', value: 'el' },
                { label: 'English', value: 'en' },
                { label: 'Esperanto', value: 'eo' },
                { label: 'Spanish', value: 'es' },
                { label: 'Estonian', value: 'et' },
                { label: 'Basque', value: 'eu' },
                { label: 'Persian (Farsi)', value: 'fa' },
                { label: 'Finnish', value: 'fi' },
                { label: 'Faroese', value: 'fo' },
                { label: 'French', value: 'fr' },
                { label: 'Irish', value: 'ga' },
                { label: 'Galician', value: 'gl' },
                { label: 'Hebrew', value: 'he' },
                { label: 'Hindi', value: 'hi' },
                { label: 'Hungarian', value: 'hu' },
                { label: 'Armenian', value: 'hy' },
                { label: 'Indonesian', value: 'id' },
                { label: 'Icelandic', value: 'is' },
                { label: 'Italian', value: 'it' },
                { label: 'Japanese', value: 'ja' },
                { label: 'Georgian', value: 'ka' },
                { label: 'Kazakh', value: 'kk' },
                { label: 'Korean', value: 'ko' },
                { label: 'Kurdish', value: 'ku' },
                { label: 'Kirghiz', value: 'ky' },
                { label: 'Lithuanian', value: 'lt' },
                { label: 'Latvian', value: 'lv' },
                { label: 'Maori', value: 'mi' },
                { label: 'Mongolian', value: 'mn' },
                { label: 'Marathi', value: 'mr' },
                { label: 'Malay', value: 'ms' },
                { label: 'Maltese', value: 'mt' },
                { label: 'Norwegian Bokmål', value: 'nb' },
                { label: 'Dutch', value: 'nl' },
                { label: 'Norwegian', value: 'no' },
                { label: 'Northern Sotho', value: 'ns' },
                { label: 'Polish', value: 'pl' },
                { label: 'Pashto', value: 'ps' },
                { label: 'Portuguese', value: 'pt' },
                { label: 'Brazilian', value: 'pt-br' },
                { label: 'Quechua', value: 'qu' },
                { label: 'Romanian', value: 'ro' },
                { label: 'Russian', value: 'ru' },
                { label: 'Slovak', value: 'sk' },
                { label: 'Albanian', value: 'sq' },
                { label: 'Swedish', value: 'sv' },
                { label: 'Swahili', value: 'sw' },
                { label: 'Tamil', value: 'ta' },
                { label: 'Telugu', value: 'te' },
                { label: 'Thai', value: 'th' },
                { label: 'Tagalog', value: 'tl' },
                { label: 'Tswana', value: 'tn' },
                { label: 'Turkish', value: 'tr' },
                { label: 'Tatar', value: 'tt' },
                { label: 'Ukranian', value: 'uk' },
                { label: 'Urdu', value: 'ur' },
                { label: 'Uzbek', value: 'uz' },
                { label: 'Chinese', value: 'zh' },
            ],
            naturalLanguagesOptions: [
                { label: 'Afrikaans', value: 'af' },
                { label: 'Arabic', value: 'ar' },
                { label: 'Azerbaijani', value: 'az' },
                { label: 'Bulgarian', value: 'bg' },
                { label: 'Bengali', value: 'bn' },
                { label: 'Catalan', value: 'ca' },
                { label: 'Czech', value: 'cs' },
                { label: 'Welsh', value: 'cy' },
                { label: 'Danish', value: 'da' },
                { label: 'German', value: 'de' },
                { label: 'Greek', value: 'el' },
                { label: 'English', value: 'en' },
                { label: 'Esperanto', value: 'eo' },
                { label: 'Spanish', value: 'es' },
                { label: 'Estonian', value: 'et' },
                { label: 'Basque', value: 'eu' },
                { label: 'Persian (Farsi)', value: 'fa' },
                { label: 'Finnish', value: 'fi' },
                { label: 'Faroese', value: 'fo' },
                { label: 'French', value: 'fr' },
                { label: 'Irish', value: 'ga' },
                { label: 'Galician', value: 'gl' },
                { label: 'Hebrew', value: 'he' },
                { label: 'Hindi', value: 'hi' },
                { label: 'Hungarian', value: 'hu' },
                { label: 'Armenian', value: 'hy' },
                { label: 'Indonesian', value: 'id' },
                { label: 'Icelandic', value: 'is' },
                { label: 'Italian', value: 'it' },
                { label: 'Japanese', value: 'ja' },
                { label: 'Georgian', value: 'ka' },
                { label: 'Kazakh', value: 'kk' },
                { label: 'Korean', value: 'ko' },
                { label: 'Kurdish', value: 'ku' },
                { label: 'Kirghiz', value: 'ky' },
                { label: 'Lithuanian', value: 'lt' },
                { label: 'Latvian', value: 'lv' },
                { label: 'Maori', value: 'mi' },
                { label: 'Mongolian', value: 'mn' },
                { label: 'Marathi', value: 'mr' },
                { label: 'Malay', value: 'ms' },
                { label: 'Maltese', value: 'mt' },
                { label: 'Norwegian Bokmål', value: 'nb' },
                { label: 'Dutch', value: 'nl' },
                { label: 'Norwegian', value: 'no' },
                { label: 'Northern Sotho', value: 'ns' },
                { label: 'Polish', value: 'pl' },
                { label: 'Pashto', value: 'ps' },
                { label: 'Portuguese', value: 'pt' },
                { label: 'Brazilian', value: 'pt-br' },
                { label: 'Quechua', value: 'qu' },
                { label: 'Romanian', value: 'ro' },
                { label: 'Russian', value: 'ru' },
                { label: 'Slovak', value: 'sk' },
                { label: 'Albanian', value: 'sq' },
                { label: 'Swedish', value: 'sv' },
                { label: 'Swahili', value: 'sw' },
                { label: 'Tamil', value: 'ta' },
                { label: 'Telugu', value: 'te' },
                { label: 'Thai', value: 'th' },
                { label: 'Tagalog', value: 'tl' },
                { label: 'Tswana', value: 'tn' },
                { label: 'Turkish', value: 'tr' },
                { label: 'Tatar', value: 'tt' },
                { label: 'Ukranian', value: 'uk' },
                { label: 'Urdu', value: 'ur' },
                { label: 'Uzbek', value: 'uz' },
                { label: 'Chinese', value: 'zh' },
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
                sortFacetValuesBy: 'count',
                attributesToHighlight: [],
                attributesToSnippet: [],
                highlightPreTag: '<em>',
                highlightPostTag: '</em>',
                snippetEllipsisText: '...',
                restrictHighlightAndSnippetArrays: false,
                page: 0,
                hitsPerPage: 20,
                offset: 0,
                length: 20,
                minWordSizefor2Typos: 8,
                typoTolerance: true,
                allowTyposOnNumericTokens: true,
                disableTypoToleranceOnAttributes: [],
                aroundLatLng: '',
                aroundLatLngViaIP: false,
                aroundRadius: 1000,
                aroundPrecision: 10,
                minimumAroundRadius: 10,
                insideBoundingBox: [],
                insidePolygon: [],
                ignorePlurals: [],
                removeStopWords: [],
                queryLanguages: [],
                naturalLanguages: [],
                decompoundQuery: true,
                enableRules: true,
                ruleContexts: [],
                enablePersonalization: false,
                personalizationImpact: 100,
                userToken: null,
                queryType: 'prefixLast',
                removeWordsIfNoResults: 'none',
                advancedSyntax: false,
                optionalWords: [],
                disableExactOnAttributes: [],
                exactOnSingleWordQuery: 'attribute',
                alternativesAsExact: ['ignorePlurals', 'singleWordSynonym'],
                advancedSyntaxFeatures: ['exactPhrase', 'excludeWords'],
                distinct: 0,
                getRankingInfo: false,
                clickAnalytics: false,
                analytics: true,
                analyticsTags: [],
                synonyms: true,
                replaceSynonymsInHighlight: false,
                minProximity: 1,
                responseFields: [],
                maxFacetHits: 10,
                percentileComputation: true,
                attributeCriteriaComputedByMinProximity: false,
                enableABTest: true,
                enableReRanking: true,
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
