import React from 'react';
import { Accordion } from '../ui/Accordion';
import { Typography } from '../ui/Typography';
import { colors } from '@/constants/colors';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <Accordion title={question}>
      <Typography variant="body" color={colors.textSecondary}>
        {answer}
      </Typography>
    </Accordion>
  );
}
