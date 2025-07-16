<template>
    <div class="task-actions">
            <button class="btn btn-sm btn-circle btn-outline-secondary me-1" @click="$event => emit('edit')">
                <IconPencil />
            </button>
            <button class="btn btn-sm btn-circle btn-outline-danger" @click="$event => emit('remove')">
                <IconTrash />
            </button>
        </div>
</template>
<script setup>
    import IconPencil from '@/components/icons/iconPencil.vue';
    import IconTrash from '@/components/icons/iconTrash.vue';

    const emit = defineEmits(['edit', 'remove']);
</script>