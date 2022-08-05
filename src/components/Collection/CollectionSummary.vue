<template>
    <div class="mb-1">Index: {{ config.index || '-' }}</div>
</template>

<script>
export default {
    props: {
        config: { type: Object, required: true },
    },
};
</script>
