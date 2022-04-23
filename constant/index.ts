import Inbox from 'public/inbox.svg'
import Next7Days from 'public/next7days.svg'
export const SIDEBAR_LIST = [
  {
    icon: Inbox,
    name: 'Inbox',
    path: '/',
    color: '#246fe0',
  },
  {
    icon: '',
    name: 'Today',
    path: '/today',
    color: '#058527',
  },
  {
    icon: Next7Days,
    name: 'Next 7 days',
    path: '/next-7-days',
    color: '#692fc2',
  },
]

export const COLORS: { code: string; name: string }[] = [
  {
    code: 'rgb(128, 128, 128)',
    name: 'Charcoal',
  },
  {
    code: 'rgb(204, 172, 147)',
    name: 'Taupe',
  },
  {
    code: 'rgb(184, 184, 184)',
    name: 'Grey',
  },
  {
    name: 'Salmon',
    code: 'rgb(255, 141, 133)',
  },
  {
    name: 'Red',
    code: 'rgb(219, 64, 53)',
  },
  {
    name: 'Orange',
    code: 'rgb(255, 153, 51)',
  },
  {
    code: 'rgb(41, 148, 56)',
    name: 'Green',
  },
  {
    code: 'rgb(20, 170, 245)',
    name: 'Sky Blue',
  },
  {
    code: 'rgb(136, 77, 255)',
    name: 'Grape',
  },
]

export const LIST_TYPE_TODO: {
  icon: any
  name: string
  color: string
  type: 'TODAY' | 'NEXT_7_DAY'
}[] = [
  {
    icon: Next7Days,
    name: 'Today',
    color: '#058527',
    type: 'TODAY',
  },
  {
    icon: Next7Days,
    name: 'Next 7 days',
    color: '#692fc2',
    type: 'NEXT_7_DAY',
  },
]
