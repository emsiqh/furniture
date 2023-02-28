import { BsFacebook, BsLinkedin, BsGithub, BsMailbox } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';

export const nav__links = [
    {
        path: 'home',
        display: 'Home',
    },
    {
        path: 'shop',
        display: 'Shop',
    },
    {
        path: 'cart',
        display: 'Cart',
    },
]

export const social__links = [
    {
        name: "facebook",
        icon: BsFacebook,
        path: "#",
    },
    {
        name: "github",
        icon: BsGithub,
        path: "#",
    },
    {
        name: "linkedin",
        icon: BsLinkedin,
        path: "#",
    },
    {
        name: "gmail",
        icon: SiGmail,
        path: "#",
    },
]