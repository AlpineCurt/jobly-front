import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "./JobCard.css";

/** Single card that displays title, company (if provided),
    salary, and equity */
const JobCard = ({ title, company, salary, equity }) => {
    return (
        <Card className="JobCard">
            <CardBody>
                <CardTitle>{title}</CardTitle>
                {company ? <CardText>{company}</CardText> : null}
                <CardText>Salary: {salary}</CardText>
                <CardText>Equity: {equity}</CardText>
            </CardBody>
        </Card>
    );
}

export default JobCard;