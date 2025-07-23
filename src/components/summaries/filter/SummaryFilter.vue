
<script setup>

import { computed, onMounted, ref } from "vue";

import { startOfWeek, endOfWeek, subWeeks, format } from "date-fns";
import Dropdown from "../../dropdown/Dropdown.vue";
import DropdownItem from "../../dropdown/DropdownItem.vue";
import DropdownTrigger from "../../dropdown/DropdownTrigger.vue";
import FilterItem from "./FilterItem.vue";
import router from "@/router";

const filterItems = computed(()=>{
    const thisWeekStart = format(startOfWeek(new Date()), 'dd-MM');
    const thisWeekEnd = format(endOfWeek(new Date()), 'dd-MM');
    const lastWeekStart = format(startOfWeek(subWeeks(new Date(), 1)), 'dd-MM');
    const lastWeekEnd = format(endOfWeek(subWeeks(new Date(), 1)), 'dd-MM');
    const thisMonthStart = format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'dd-MM');
    const thisMonthEnd = format(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), 'dd-MM');
    const lastMonthStart = format(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), 'dd-MM');
    const lastMonthEnd = format(new Date(new Date().getFullYear(), new Date().getMonth(), 0), 'dd-MM');

    return {
        'today': "Today",
        'yesterday': "Yesterday",
        'thisweek': `This Week (${thisWeekStart} - ${thisWeekEnd})`,
        'lastweek': `Last Week (${lastWeekStart} - ${lastWeekEnd})`,
        'thismonth': `This Month (${thisMonthStart} - ${thisMonthEnd})`,
        'lastmonth': `Last Month (${lastMonthStart} - ${lastMonthEnd})`,
    }  
});

const emit = defineEmits(['update']);



const filter = (period) => {
    activeFilterKey.value = period;

    router.push({
        name: 'summary',
        query: { period }
    }); 

    emit('update',{
        text: activeFilter.value,
        period: activeFilterKey.value
    });
}

onMounted(() => {
    // Initialize with the default filter
    emit('update', activeFilter.value);
});

const activeFilterKey = ref('last_week');

const activeFilter = computed(
    () =>
        filterItems.value[activeFilterKey.value] || filterItems.value.thisweek,
);
</script>

<template>
    <Dropdown>
        <template v-slot:trigger="{ toggleClass, toggle }">
            <DropdownTrigger
                class="btn btn-outline-secondary"
                :class="toggleClass"
                type="button"
                @click="toggle"
                >{{ activeFilter }}</DropdownTrigger
            >
        </template>
        <template v-slot:menu="{ toggle }">
            <DropdownItem v-for="(value, key) in filterItems" :key="key" href="#" @click.prevent="toggle(), filter(key)">
                <FilterItem :text="value" :selected="key === activeFilterKey" />
            </DropdownItem>
        </template>
    </Dropdown>
</template>