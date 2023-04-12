import React from "react";
import "./CompanyCard.css";  
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const CompanyCard = ({ name, description }) => {
    return (
        <Card className="CompanyCard">
            <CardBody>
                <CardTitle>{name}</CardTitle>
                <CardText>{description}</CardText>
            </CardBody>
        </Card>
    );
}

CompanyCard.defaultProps = {
    companyName: "DramCorp",
    description: "We're all happy working here! :D"
}

export default CompanyCard;