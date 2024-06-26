import {
  Apple,
  Facebook,
  Google,
  KakaoTalk,
  Line,
  QrCode,
  Twitter,
} from '@/assets/icons/icons'
import { routeConstants } from '@/shared/constants/routes'
import {
  BookA,
  Bookmark,
  CircleHelp,
  Coins,
  Compass,
  Home,
  Keyboard,
  Lightbulb,
  LogOut,
  Moon,
  Settings,
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

export const navItemConstants = Object.freeze({
  HOME: {
    ...HOME,
    Icon: Home,
    requireLogin: false,
  },
  FOLLOWING: {
    ...FOLLOWING,
    Icon: UserRoundPlus,
    requireLogin: false,
  },
  FRIENDS: {
    ...FRIENDS,
    Icon: Users,
    requireLogin: true,
  },
  EXPLORE: {
    ...EXPLORE,
    Icon: Compass,
    requireLogin: false,
  },
  LIVE: {
    ...LIVE,
    Icon: Video,
    requireLogin: false,
  },
  PROFILE: {
    ...PROFILE,
    Icon: UserRound,
    requireLogin: true,
  },
})

/**
 * The login items
 * @constant
 */

export const loginMethodConstants = Object.freeze({
  QR_CODE: {
    id: 'qr_code',
    Icon: QrCode,
    title: 'Use QR code',
  },
  USERNAME: {
    id: 'phone_email_username',
    Icon: UserRound,
    title: 'Use phone / email / username',
  },
  FACEBOOK: {
    id: 'facebook',
    Icon: Facebook,
    title: 'Continue with Facebook',
  },
  GOOGLE: {
    id: 'google',
    Icon: Google,
    title: 'Continue with Google',
  },
  TWITTER: {
    id: 'twitter',
    Icon: Twitter,
    title: 'Continue with Twitter',
  },
  LINE: {
    id: 'line',
    Icon: Line,
    title: 'Continue with LINE',
  },
  KAKAOTALK: {
    id: 'kakaotalk',
    Icon: KakaoTalk,
    title: 'Continue with KakaoTalk',
  },
  APPLE: {
    id: 'apple',
    Icon: Apple,
    title: 'Continue with Apple',
  },
})

/**
 * The logged in dropdown items
 */

export const dropDownItemConstants = Object.freeze({
  VIEW_PROFILE: {
    id: 'view_profile',
    label: 'View Profile',
    Icon: UserRound,
    to: 'profile',
  },
  FAVORITES: {
    id: 'favorites',
    label: 'Favorites',
    Icon: Bookmark,
  },
  GET_COIN: {
    id: 'get_coin',
    label: 'Get Coin',
    Icon: Coins,
  },
  LIVE_STUDIO: {
    id: 'live_studio',
    label: 'LIVE Studio',
    Icon: Video,
  },
  LIVE_CREATOR_HUB: {
    id: 'live_studio_hub',
    label: 'Live Creator Hub',
    Icon: Lightbulb,
  },
  LANGUAGES: {
    id: 'languages',
    label: 'English',
    Icon: BookA,
    children: [
      {
        id: 'en',
        label: 'English',
      },
      {
        id: 'vi',
        label: 'Tiếng Việt (Việt Nam)',
      },
    ],
  },
  FEEDBACK_AND_HELP: {
    id: 'feedback_and_help',
    label: 'Feedback and help',
    Icon: CircleHelp,
  },
  KEYBOARD_SHORTCUTS: {
    id: 'keyboard_shortcut',
    label: 'Keyboard shortcuts',
    Icon: Keyboard,
  },
  DARK_MODE: {
    id: 'dark_mode',
    label: 'Dark mode',
    Icon: Moon,
  },
  LOGOUT: {
    id: 'logout',
    label: 'Log out',
    Icon: LogOut,
  },
  SETTINGS: {
    id: 'settings',
    label: 'Settings',
    Icon: Settings,
  },
})

/**
 * The user profile tab items
 */

export const userProfileTabItems = Object.freeze({
  VIDEOS: {
    label: 'videos',
  },
  FAVORITES: {
    label: 'favorites',
  },
  REPOST: {
    label: 'repost',
  },
  LIKED: {
    label: 'liked',
  },
})

/**
 * Explore tags
 */
export const exploreTags = Object.freeze([
  'Singing & Dancing',
  'Comedy',
  'Sports',
  'Anime & Comics',
  'Relationship',
  'Shows',
  'Lipsync',
  'Daily Life',
  'Beauty Care',
  'Games',
  'Society',
  'Outfit',
  'Cars',
  'Food',
  'Animals',
  'Family',
  'Drama',
  'Fitness & Health',
  'Education',
  'Technology',
])
