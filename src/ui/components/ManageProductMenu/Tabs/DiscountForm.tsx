import styled from 'styled-components';
import { DiscountType, initialDiscountState } from '@Types/DiscountType.ts';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '~@/ui/components/Button.tsx';
import { theme } from '~@/ui/theme';
import { useUpsertDiscountUseCase } from '~@/usecases/useUpsertDiscountUseCase.ts';
import { useDeleteDiscountUseCase } from '~@/usecases/useDeleteDiscountUseCase.ts';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { DateTime } from 'luxon';
import { convertDateToInput } from '@Utils/date.ts';

export const DiscountForm = () => {
  const init = initialDiscountState;
  const [data, setData] = useState<DiscountType>(init);
  const { selectedDiscount, setSelectedDiscount } =
    useContext(AdminModeContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateDiscounts } = useUpsertDiscountUseCase();
  const { deleteDiscount } = useDeleteDiscountUseCase();

  useEffect(() => {
    if (data.endDate < data.startDate) {
      setData({ ...data, endDate: data.startDate });
    }
  }, [data]);

  useEffect(() => {
    if (selectedDiscount) {
      setData(selectedDiscount);
    }
  }, [selectedDiscount]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'cumulative' || name === 'enabled') {
      setData({ ...data, [name]: checked });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const startDateMin = DateTime.now().toFormat('yyyy-MM-dd');
  const endDateMin = DateTime.fromISO(data.startDate).toFormat('yyyy-MM-dd');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    await updateDiscounts(data)
      .then(() => {
        resetSelectedDiscount();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const label = selectedDiscount ? 'Modifier' : 'Ajouter';

  const resetSelectedDiscount = () => {
    setSelectedDiscount(null);
    setData(init);
    setIsLoading(false);
  };

  const removeDiscount = () => {
    if (isLoading) return;
    if (selectedDiscount) {
      setIsLoading(true);
      deleteDiscount(selectedDiscount.id)
        .then(() => {
          resetSelectedDiscount();
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Main $selectedDiscount={selectedDiscount}>
      <h3>{label} un code promo</h3>
      <form onSubmit={handleSubmit}>
        <div className={'form_container'}>
          <div className={'input_group'}>
            <label htmlFor="code">Code</label>
            <input
              type="text"
              name="code"
              id="code"
              onChange={onChange}
              value={data.code}
              required
            />
          </div>
          <div className={'input_group'}>
            <label htmlFor="percentage">Pourcentage</label>
            <input
              type="number"
              name="percentage"
              id="percentage"
              onChange={onChange}
              value={data.percentage}
            />
          </div>
          <div className={'input_group'}>
            <label htmlFor="startDate">Date de début</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              onChange={onChange}
              min={startDateMin}
              value={convertDateToInput(data.startDate)}
            />
          </div>
          <div className={'input_group'}>
            <label htmlFor="endDate">Date de fin</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              onChange={onChange}
              min={endDateMin}
              value={convertDateToInput(data.endDate)}
            />
          </div>
          <div className={'input_group'}>
            <label htmlFor="cumulative">Cumulable</label>
            <input
              type="checkbox"
              name="cumulative"
              id="cumulative"
              onChange={onChange}
              checked={data.cumulative}
            />
          </div>
          <div className={'input_group'}>
            <label htmlFor="enabled">Activé</label>
            <input
              type="checkbox"
              name="enabled"
              id="enabled"
              onChange={onChange}
              checked={data.enabled}
            />
          </div>
        </div>
        <div className={'buttons'}>
          <Button
            variant={'primary'}
            width={'100%'}
            padded={false}
            disabled={isLoading}
          >
            {label} le code promo
          </Button>
          {selectedDiscount && (
            <>
              <Button
                variant={'red'}
                width={'100%'}
                padded={false}
                onClick={resetSelectedDiscount}
              >
                Annuler
              </Button>
              <Button
                variant={'red'}
                width={'100%'}
                padded={false}
                onClick={removeDiscount}
                disabled={isLoading}
              >
                Supprimer
              </Button>
            </>
          )}
        </div>
      </form>
    </Main>
  );
};

const Main = styled.div<{ $selectedDiscount: DiscountType | null }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  width: 100%;
  overflow: hidden;
  padding: 10px;

  h3 {
    text-align: center;
    color: ${({ $selectedDiscount }) =>
      $selectedDiscount ? theme.colors.red : theme.colors.primary};
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    .form_container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      [for='cumulative'],
      [for='enabled'] {
        text-align: center;
      }

      .input_group {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
        height: 100%;

        input {
          border: 1px solid ${theme.colors.primary};
          border-radius: 5px;
          padding: 5px;
        }
      }
    }

    .buttons {
      display: grid;
      grid-template-columns: ${({ $selectedDiscount }) =>
        $selectedDiscount ? '3fr 1fr 1fr' : '1fr'};
      gap: 5px;
      margin-top: 5px;
    }
  }
`;
