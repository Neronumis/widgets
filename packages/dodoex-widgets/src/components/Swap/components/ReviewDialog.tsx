import { Trans } from '@lingui/macro';
import BigNumber from 'bignumber.js';
import { useEffect, useState, useMemo } from 'react';
import Dialog, { DialogProps } from './Dialog';
import { Box, Button, BaseButton, useTheme } from '@dodoex/components';
import { TokenInfo } from '../../../hooks/Token';
import { formatTokenAmountNumber } from '../../../utils/formatter';
import { formatReadableNumber } from '../../../utils/formatter';
import TokenLogo from '../../TokenLogo';
import { DetailBorder, Done, CaretUp, DoubleRight } from '@dodoex/icons';
import { setGlobalProps } from '../../../store/actions/globals';
import { getGlobalProps } from '../../../store/selectors/globals';
import { ContractStatus } from '../../../store/reducers/globals';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from '../../../store/actions';
import useInflights from '../../../hooks/Submission/useInflights';
import { PRICE_IMPACT_THRESHOLD } from '../../../constants/swap';
import { QuestionTooltip } from '../../Tooltip';
import { getSlippage } from '../../../store/selectors/settings';

export interface ReviewDialogProps {
  open: boolean;
  execute: () => void;
  onClose: () => void;
  clearToAmt: () => void;
  clearFromAmt: () => void;
  toToken: TokenInfo | null;
  fromToken: TokenInfo | null;
  priceImpact: string;
  fromAmount: string | number | null;
  toAmount: string | number | null;
  baseFeeAmount: number | null;
  additionalFeeAmount: number | null;
  curToFiatPrice: BigNumber | null;
  curFromFiatPrice: BigNumber | null;
  pricePerFromToken: number | null;
}
export function ReviewDialog({
  open,
  execute,
  onClose,
  toToken,
  fromToken,
  fromAmount,
  toAmount,
  priceImpact,
  clearFromAmt,
  clearToAmt,
  baseFeeAmount,
  curToFiatPrice,
  curFromFiatPrice,
  pricePerFromToken,
  additionalFeeAmount,
}: ReviewDialogProps) {
  const theme = useTheme();
  const slippage = useSelector(getSlippage);
  const dispatch = useDispatch<AppThunkDispatch>();
  const { contractStatus } = useSelector(getGlobalProps);
  const isPriceWaningShown = useMemo(
    () => new BigNumber(priceImpact).gt(PRICE_IMPACT_THRESHOLD),
    [priceImpact],
  );
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (contractStatus !== ContractStatus.Pending) {
      onClose();
    }
    if (contractStatus === ContractStatus.TxSuccess) {
      clearToAmt();
      clearFromAmt();
    }
  }, [contractStatus]);

  useEffect(() => {
    // Need to recheck if price update!
    setIsChecked(false);
  }, [curToFiatPrice]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(
          setGlobalProps({
            contractStatus: ContractStatus.Initial,
          }),
        );
        onClose();
      }}
      title={<Trans>Swap summary</Trans>}
    >
      <Box
        sx={{
          margin: 20,
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          borderTop: `1px solid ${theme.palette.border.main}`,
        }}
      >
        <Box
          sx={{
            py: 20,
            display: 'flex',
            typography: 'body2',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            borderBottom: `1px solid ${theme.palette.border.main}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <Box sx={{ display: 'flex' }}>
                <TokenLogo
                  width={16}
                  height={16}
                  address={fromToken?.address ?? ''}
                  marginRight={6}
                />
                <Box>{`${formatTokenAmountNumber({
                  input: fromAmount as number,
                  decimals: fromToken?.decimals,
                })} ${fromToken?.symbol}`}</Box>
              </Box>
              <Box
                sx={{
                  mt: 4,
                  typography: 'h6',
                  color: theme.palette.text.secondary,
                }}
              >
                {curFromFiatPrice
                  ? `$${formatReadableNumber({
                      input: curFromFiatPrice,
                      showDecimals: 1,
                    })}`
                  : '-'}
              </Box>
            </Box>
            <Box sx={{ width: 16, mx: 16 }} component={DoubleRight} />
            <Box>
              <Box sx={{ display: 'flex' }}>
                <TokenLogo
                  width={16}
                  height={16}
                  marginRight={6}
                  address={toToken?.address ?? ''}
                />
                <Box>{`${formatTokenAmountNumber({
                  input: toAmount as number,
                  decimals: toToken?.decimals,
                })} ${toToken?.symbol}`}</Box>
              </Box>
              <Box
                sx={{
                  typography: 'h6',
                  mt: 4,
                  color: theme.palette.text.secondary,
                }}
              >
                {curToFiatPrice
                  ? `$${formatReadableNumber({
                      input: curToFiatPrice,
                      showDecimals: 1,
                    })}(${priceImpact}%)`
                  : '-'}
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 12, typography: 'h6' }}>{`1 ${
            fromToken?.symbol
          }  = ${formatTokenAmountNumber({
            input: new BigNumber(toAmount as number).dividedBy(
              new BigNumber(fromAmount as number),
            ),
            decimals: toToken?.decimals,
          })} ${toToken?.symbol}`}</Box>
        </Box>

        <Box
          sx={{
            py: 15,
            typography: 'body2',
            borderBottom: `1px solid ${theme.palette.border.main}`,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: theme.palette.text.secondary,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box sx={{ width: 16, mr: 7 }} component={DetailBorder} />
              <Trans>Swap Detail</Trans>
            </Box>
            <Box component={BaseButton}>
              <Box
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                sx={{
                  width: 10,
                  color: 'text.secondary',
                  transform: isDetailsOpen
                    ? 'rotateX(0deg)'
                    : 'rotateX(180deg)',
                }}
                component={CaretUp}
              />
            </Box>
          </Box>

          <Box sx={{ mt: 16, display: isDetailsOpen ? 'initial' : 'none' }}>
            <Box
              sx={{
                mt: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Trans>Basic Fee</Trans>
                <QuestionTooltip
                  title={<Trans>Estimated service provider fees</Trans>}
                  ml={5}
                />
              </Box>
              <Box>{`${formatTokenAmountNumber({
                input: baseFeeAmount as number,
                decimals: toToken?.decimals,
              })} ${toToken?.symbol}`}</Box>
            </Box>

            <Box
              sx={{
                mt: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Trans>Additional Fee</Trans>
                <QuestionTooltip
                  title={
                    <Trans>
                      Additional routing fees set by the Widget user
                    </Trans>
                  }
                  ml={5}
                />
              </Box>
              <Box>{`${formatTokenAmountNumber({
                input: additionalFeeAmount as number,
                decimals: toToken?.decimals,
              })} ${toToken?.symbol}`}</Box>
            </Box>

            <Box
              sx={{
                mt: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Trans>Price Impact</Trans>
                <QuestionTooltip
                  title={
                    <Trans>
                      Due to the market condition, market price and estimated
                      price may have a slight difference
                    </Trans>
                  }
                  ml={5}
                />
              </Box>
              <Box>{`${priceImpact}%`}</Box>
            </Box>

            <Box
              sx={{
                mt: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Trans>Slippage</Trans>
                <QuestionTooltip
                  title={
                    <Trans>
                      High slippage tolerance will increase the success rate of
                      transaction, but might not get the best quote.
                    </Trans>
                  }
                  ml={5}
                />
              </Box>
              <Box>{slippage}</Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: 1 }} />

        {isPriceWaningShown && (
          <Box
            sx={{
              mb: 14,
              display: 'flex',
              cursor: 'pointer',
              justifyContent: 'center',
              alignItems: 'center',
              typography: 'h6',
            }}
            onClick={() => setIsChecked(!isChecked)}
          >
            <Box
              sx={{
                mr: 4,
                width: 18,
                height: 18,
                alignItems: 'center',
              }}
            >
              {isChecked ? (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'secondary.main',
                  }}
                >
                  <Box component={Done} sx={{ width: 14, color: '#1a1a1b' }} />
                </Box>
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 4,
                    border: `1px solid ${theme.palette.text.secondary}`,
                  }}
                />
              )}
            </Box>
            <Box>
              <Trans
                id="Price impact reaches <0>{priceImpact}</0>%, accept the quote"
                // @ts-ignore: Unreachable code error
                components={{
                  0: <Box component="span" sx={{ color: 'error.main' }} />,
                }}
                values={{ priceImpact }}
              />
            </Box>
          </Box>
        )}

        <Button
          isLoading={contractStatus == ContractStatus.Pending}
          disabled={isPriceWaningShown && !isChecked}
          fullWidth
          onClick={() => {
            execute();
            dispatch(
              setGlobalProps({
                contractStatus: ContractStatus.Pending,
              }),
            );
          }}
        >
          {contractStatus == ContractStatus.Pending ? (
            <Trans>Confirming</Trans>
          ) : (
            <Trans>Confirm swap</Trans>
          )}
        </Button>
      </Box>
    </Dialog>
  );
}
