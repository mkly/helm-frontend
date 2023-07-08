import React, { useState } from "react";
import { List, ListItem, Title, Flex, Button, Icon } from "@tremor/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import type { IDisplayPrediction } from "loaders/displayPredictions";
import type { IDisplayRequest } from "loaders/displayRequests";

import Request from "components/Request";

type Props = {
  predictions: IDisplayPrediction[];
  requests: IDisplayRequest[];
};

/**
 * @SEE https://github.com/stanford-crfm/helm/blob/cffe38eb2c814d054c778064859b6e1551e5e106/src/helm/benchmark/static/benchmarking.js#L583-L679
 */
export default function Predictions({ predictions, requests }: Props) {
  const [openRequests, setOpenRequests] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const handleOpenRequests = () => {
    setOpenRequests(!openRequests);
  };
  const handleOpenDetails = () => {
    setOpenDetails(!openDetails);
  };

  if (predictions.length < 1) {
    return null;
  }

  return (
    <>
      <Title>
        Predictions
        <Button
          onClick={handleOpenRequests}
          size="xs"
          variant="light"
          className="ml-2"
        >
          {openRequests ? "Hide Requests" : "Show Requests"}
        </Button>
        <Button
          onClick={handleOpenDetails}
          size="xs"
          variant="light"
          className="ml-2"
        >
          {openDetails ? "Hide Details" : "Show Details"}
        </Button>
      </Title>
      <Flex className="flex-wrap justify-start">
        {predictions.map((prediction, idx) => (
          <>
            <List key={idx} className="max-w-xs">
              <Title className="mt-2">
                Prediction [trial {prediction.train_trial_index}]{" "}
                {prediction.predicted_text}
                {prediction.stats["quasi_exact_match"] ? (
                  <Icon icon={CheckCircleIcon} color="green" />
                ) : (
                  <Icon icon={XCircleIcon} color="red" />
                )}
              </Title>
              {openDetails
                ? Object.keys(prediction.stats).map((statKey, idx) => (
                    <ListItem key={idx}>
                      {statKey}: {prediction.stats[statKey]}
                    </ListItem>
                  ))
                : null}
              {openRequests ? <Request request={requests[idx]} /> : null}
            </List>
          </>
        ))}
      </Flex>
    </>
  );
}
