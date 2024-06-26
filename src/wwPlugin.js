/* wwEditor:start */
import './components/Configuration/SettingsEdit.vue';
import './components/Configuration/SettingsSummary.vue';
import './components/Collection/CollectionEdit.vue';
import './components/Collection/CollectionSummary.vue';
import './components/Functions/Search.vue';
/* wwEditor:end */
import algoliasearch from 'algoliasearch';

export default {
    client: null,
    indexes: [],
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    async _onLoad(settings) {
        /* wwFront:start */
        await this.load(settings.publicData.applicationId, settings.publicData.apiKey);
        /* wwFront:end */
        /* wwEditor:start */
        await this.load(settings.publicData.applicationId, settings.privateData.apiKey);
        /* wwEditor:end */
    },
    /*=============================================m_ÔÔ_m=============================================\
        Collection API
    \================================================================================================*/
    async _fetchCollection(collection) {
        if (collection.mode === 'dynamic') {
            try {
                const index = this.client.initIndex(collection.config.index);
                const searchParameters = (collection.config.searchParameters || []).reduce((obj, item) => {
                    obj[item] = collection.config[item];
                    return obj;
                }, {});
                if (
                    !searchParameters.page &&
                    !searchParameters.hitsPerPage &&
                    !searchParameters.offset &&
                    !searchParameters.length
                ) {
                    searchParameters.offset = collection.offset || 0;
                    searchParameters.length = collection.limit || 20;
                }
                const data = await index.search(collection.config.search, searchParameters);
                return { data: _.get(data, collection.config.resultKey, data), total: data.nbHits };
            } catch (err) {
                return {
                    error: Object.getOwnPropertyNames(err).reduce((obj, key) => ({ ...obj, [key]: err[key] }), {}),
                };
            }
        } else {
            return { data: null, error: null };
        }
    },
    /*=============================================m_ÔÔ_m=============================================\
        Algolia API
    \================================================================================================*/
    async load(applicationId, apiKey) {
        if (!applicationId || !apiKey) return;
        try {
            this.client = algoliasearch(applicationId, apiKey);
            if (!this.client) throw new Error('Invalid Algolia configuration.');
            /* wwEditor:start */
            this.fetchIndexes();
            /* wwEditor:end */
        } catch (err) {
            this.client = null;
            wwLib.wwLog.error(err);
            /* wwEditor:start */
            wwLib.wwNotification.open({ text: 'Invalid Algolia configuration.', color: 'red' });
            /* wwEditor:end */
        }
    },
    async search({ index, search, page, limit }) {
        index = this.client.initIndex(index);
        return await index.search(search, { page: page || 0, hitsPerPage: limit || 20 });
    },
    /* wwEditor:start */
    async fetchIndexes() {
        if (!this.client) throw new Error('Invalid Algolia configuration.');
        const { items } = await this.client.listIndices();
        this.indexes = items;
        return items;
    },
    /* wwEditor:end */
};
