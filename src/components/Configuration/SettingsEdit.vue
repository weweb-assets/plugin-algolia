<template>
    <wwEditorFormRow required label="Application ID">
        <template #append-label>
            <a class="ww-editor-link ml-2" href="https://www.algolia.com/account/api-keys/all" target="_blank">
                Find it here
            </a>
        </template>
        <wwEditorInputRow
            type="query"
            placeholder="Enter a value"
            :model-value="settings.publicData.applicationId"
            @update:modelValue="changeApplicationId"
        />
    </wwEditorFormRow>
    <wwEditorInputRow
        label="Search-Only API Key"
        required
        type="query"
        placeholder="Enter a value"
        :model-value="settings.publicData.apiKey"
        @update:modelValue="changeApiKey"
    />
    <wwEditorFormRow required label="Admin API Key">
        <div class="flex items-center">
            <wwEditorInputText
                :type="isKeyVisible ? 'text' : 'password'"
                placeholder="**************"
                :model-value="settings.privateData.apiKey"
                @update:modelValue="changeApiKey"
                class="w-100 mr-2"
            />
            <button class="ww-editor-button -icon -secondary -dark" @click.prevent="isKeyVisible = !isKeyVisible">
                <wwEditorIcon :name="isKeyVisible ? 'eye-off' : 'eye'"></wwEditorIcon>
            </button>
        </div>
    </wwEditorFormRow>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        settings: { type: Object, required: true },
    },
    emits: ['update:settings'],
    data() {
        return {
            isKeyVisible: false,
        };
    },
    methods: {
        changeApplicationId(applicationId) {
            this.$emit('update:settings', {
                ...this.settings,
                publicData: { ...this.settings.publicData, applicationId },
            });
            this.$nextTick(this.loadInstance);
        },
        changeApiKey(apiKey) {
            this.$emit('update:settings', {
                ...this.settings,
                publicData: { ...this.settings.publicData, apiKey },
            });
            this.$nextTick(this.loadInstance);
        },
        changePrivateApiKey(apiKey) {
            this.$emit('update:settings', {
                ...this.settings,
                privateData: { ...this.settings.privateData, apiKey },
            });
            this.$nextTick(this.loadInstance);
        },
        loadInstance() {
            this.plugin.load(this.settings.publicData.applicationId, this.settings.privateData.apiKey);
        },
    },
};
</script>
