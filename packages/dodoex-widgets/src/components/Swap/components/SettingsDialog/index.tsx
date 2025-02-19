import { t, Trans } from '@lingui/macro';
import { useEffect, useState, useMemo } from 'react';
import Dialog, { DialogProps } from '../Dialog';
import { QuestionTooltip } from '../../../Tooltip';
import { Box, Input, useTheme } from '@dodoex/components';
import { NumberInput } from './NumberInput';
import {
  DEFAULT_SWAP_DDL,
  MAX_SWAP_SLIPPAGE,
  DEFAULT_SWAP_SLIPPAGE,
} from '../../../../constants/swap';
import { TokenInfo } from '../../../../hooks/Token';
import { useSelector } from 'react-redux';
import { getSlippage, getTxDdl } from '../../../../store/selectors/settings';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../../../store/actions';
import { setSlippage, setTxDdl } from '../../../../store/actions/settings';

export interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}
export function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const theme = useTheme();
  const dispatch = useDispatch<AppThunkDispatch>();
  const slippage = useSelector(getSlippage);
  const ddl = useSelector(getTxDdl);
  const isSlippageGTMax = useMemo(
    () => Number(slippage) >= MAX_SWAP_SLIPPAGE,
    [slippage],
  );
  return (
    <Dialog open={open} onClose={onClose} title={<Trans>Settings</Trans>}>
      <Box
        sx={{
          mx: 20,
        }}
      >
        <Box
          sx={{ py: 20, borderTop: `1px solid ${theme.palette.border.main}` }}
        >
          <Box sx={{ mb: 16, display: 'flex', alignItems: 'center' }}>
            <Trans>Slippage Tolerance</Trans>
            <QuestionTooltip
              title={
                <Trans>
                  Attention: High slippage tolerance will increase the success
                  rate of transaction, but might not get the best quote.
                </Trans>
              }
              ml={7}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <NumberInput
              fullWidth
              maxVal={100}
              value={slippage as string}
              placeholder={DEFAULT_SWAP_SLIPPAGE.toString()}
              onInputChange={(v: string | null) => {
                dispatch(setSlippage(v));
              }}
              suffix={<Box sx={{ color: 'text.disabled' }}>%</Box>}
              height={36}
            />
            {isSlippageGTMax && (
              <Box
                sx={{
                  typography: 'h6',
                  mt: 6,
                  color: 'error.main',
                }}
              >
                <Trans>Maximum slippage do not exceed 50%</Trans>
              </Box>
            )}
          </Box>
        </Box>

        <Box
          sx={{ py: 20, borderTop: `1px solid ${theme.palette.border.main}` }}
        >
          <Box sx={{ mb: 16, display: 'flex', alignItems: 'center' }}>
            <Trans>Transaction Deadline</Trans>
            <QuestionTooltip
              title={
                <Trans>
                  If your transaction time exceeds the deadline, your
                  transaction will be rescinded.
                </Trans>
              }
              ml={7}
            />
          </Box>
          <NumberInput
            value={ddl}
            fullWidth
            height={36}
            placeholder={t`${DEFAULT_SWAP_DDL} minutes`}
            onInputChange={(val: string | null) => {
              dispatch(setTxDdl(val ? Math.max(Number(val), 1) : ''));
            }}
          />
        </Box>
      </Box>
    </Dialog>
  );
}
