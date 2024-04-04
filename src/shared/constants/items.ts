import { routeConstants } from '@/shared/constants/routes'

import {
  Compass,
  Home,
  UserRound,
  UserRoundPlus,
  Users,
  Video,
} from 'lucide-react'

const { HOME, FOLLOWING, EXPLORE, LIVE, PROFILE, FRIENDS } = routeConstants

/**
 * The navbar items in Sidebar component
 * @constant
 */

export const itemConstants = Object.freeze({
  HOME: {
    ...HOME,
    Icon: Home,
  },
  FOLLOWING: {
    ...FOLLOWING,
    Icon: UserRoundPlus,
  },
  FRIENDS: {
    ...FRIENDS,
    Icon: Users,
  },
  EXPLORE: {
    ...EXPLORE,
    Icon: Compass,
  },
  LIVE: {
    ...LIVE,
    Icon: Video,
  },
  PROFILE: {
    ...PROFILE,
    Icon: UserRound,
  },
})

/**
 * The login items
 * @constant
 */

export const loginConstants = Object.freeze({})
