import { Text } from "@mantine/core";
import { motion } from "framer-motion";

interface NavbarMobileItemProps {
  title: string;
  icon: JSX.Element;
  badge?: JSX.Element;
}

function NavbarMobileItem(props: NavbarMobileItemProps) {
  return (
    <motion.div
      className="flex items-center justify-between w-full"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-3">
        <div className="text-xl">
          {props.icon}
        </div>
        <Text
          className="text-base font-medium"
          style={{
            color: "inherit",
            letterSpacing: "0.025em"
          }}
        >
          {props.title}
        </Text>
      </div>
      {props.badge && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {props.badge}
        </motion.div>
      )}
    </motion.div>
  );
}

export default NavbarMobileItem;