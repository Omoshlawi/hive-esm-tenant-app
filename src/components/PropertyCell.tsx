import { Button, Loader } from "@mantine/core";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useProperty } from "../hooks";
type Props = { propertyId: string };
const PropertyCell: FC<Props> = ({ propertyId }) => {
  const { property, error, isLoading } = useProperty(propertyId);

  if (isLoading) return <Loader size={"sm"} />;
  if (error || !property) return <span>--</span>;
  return (
    <Button
      component={Link}
      to={`/dashboard/properties/${propertyId}`}
      variant="transparent"
      p={0}
      m={0}
    >
      {property?.name}
    </Button>
  );
};

export default PropertyCell;
