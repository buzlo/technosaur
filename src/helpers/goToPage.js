import eventBus from '@/eventBus';

export default function goToPage(pageName, pageParams) {
  eventBus.$emit('goToPageEvent', pageName, pageParams);
}
