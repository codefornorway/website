<script setup>
defineProps(['member']);
</script>

<template>
  <a :href="member.html_url" target="_blank" class="members-card group">
    <div class="flex relative h-full">
      <div class="flex-1 items-start justify-start pr-4">
        <div class="flex items-center space-x-3 mb-4">
          <img :src="member.avatar_url" alt="" class="w-13 h-13 rounded-full" />
          <div class="space-y-0.5">
            <h3 class="font-semibold text-gray-900 group-[&:hover]:underline">{{ member.name }}</h3>
            <p class="text-sm font-medium text-gray-500">{{ member.followers }} Followers</p>
          </div>
        </div>
        <p class="mt-1 leading-snug text-ellipsis line-clamp-3 text-[#2d2926]">
          {{ member.bio || '' }}
        </p>
      </div>
      <RightArrow class="text-[#0072ce] w-6" />
      <div class="absolute right-0 top-0 px-1 py-0.5 text-xs bg-gray-200">Member</div>
    </div>
  </a>
</template>
