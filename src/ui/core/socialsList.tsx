import { getColor } from "@/utils";
import { Flex, FlexProps, Link } from "@chakra-ui/react";
import { FC } from "react";
import { AiFillLinkedin } from "react-icons/ai";
import { DiGithubBadge } from "react-icons/di";
import { FaTelegramPlane } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { useChainId } from "wagmi";

export interface Social {
  name: string;
  url: string;
  icon?: React.ReactElement;
}

export interface Socials {
  [key: string]: Social;
}

export const socialsList: Socials = {
  telegram: {
    name: "Telegram",
    url: "https://t.me/Okekejr",
    icon: <FaTelegramPlane size="1.3rem" />,
  },
  twitter: {
    name: "Twitter",
    url: "https://x.com/DylanOkeks",
    icon: <RiTwitterXLine />,
  },
  linkedin: {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/emmanuel-okeke/",
    icon: <AiFillLinkedin size="1.2rem" />,
  },
  github: {
    name: "Github",
    url: "https://github.com/Okekejr",
    icon: <DiGithubBadge size="1.5rem" />,
  },
};

export const MySocials: FC<FlexProps> = ({ ...rest }) => {
  const chainId = useChainId();

  return (
    <Flex
      justifyContent="space-evenly"
      gap="12px"
      alignItems="center"
      {...rest}
    >
      {Object.values(socialsList).map((social) => {
        return (
          <Link
            key={social.name}
            href={social.url}
            _hover={{ color: getColor({ chainId: chainId }) }}
            isExternal
          >
            {social.icon}
          </Link>
        );
      })}
    </Flex>
  );
};
