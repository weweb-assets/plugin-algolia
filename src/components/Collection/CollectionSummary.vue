<template>
    <div class="algolia-collection-summary">
        <div class="label-sm content-primary">Index</div>
        <div class="body-sm content-secondary truncate">{{ config.index || '-' }}</div>
    </div>
</template>

<script>
export default {
    props: {
        config: { type: Object, required: true },
    },
};
</script>

<style lang="scss" scoped>
.algolia-collection-summary {
    display: grid;
    grid-template-columns: 0fr 1fr;
    column-gap: var(--ww-spacing-02);
    row-gap: var(--ww-spacing-02);
}
</style>
