import React from "react";
import "./CompanyCard.css";  
import { Card, CardBody, CardTitle, CardText, CardLink } from "reactstrap";

/** Single Card that displays name and description of a company */
const CompanyCard = ({ name, description, handle }) => {
    return (
        <CardLink className="CompanyCard" href={`companies/${handle}`}>
            <Card className="CompanyCard">
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardText>{description}</CardText>
                </CardBody>
            </Card>
        </CardLink>
    );
}

CompanyCard.defaultProps = {
    companyName: "DramCorp",
    description: "We're all happy working here! :D"
}

export default CompanyCard;