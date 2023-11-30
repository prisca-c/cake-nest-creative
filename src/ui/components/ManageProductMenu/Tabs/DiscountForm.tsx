import styled from 'styled-components';
import { DiscountType, initialDiscountState } from '@Types/DiscountType.ts';
import React, { useEffect, useState } from 'react';
import { Button } from '~@/ui/components/Button.tsx';
import { convertDateToInput } from '@Utils/date.ts';
import { theme } from '~@/ui/theme';
import { useUpsertDiscountUseCase } from '~@/usecases/useUpsertDiscountUseCase.ts';

export const DiscountForm = () => {
  const init = initialDiscountState;
  const [data, setData] = useState<DiscountType>(init);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateDiscounts } = useUpsertDiscountUseCase();
  useEffect(() => {
    if (data.endDate < data.startDate) {
      setData({ ...data, endDate: data.startDate });
    }
  }, [data]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'cumulative' || name === 'enabled') {
      setData({ ...data, [name]: checked });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const startDateMin = convertDateToInput(new Date());
  const endDateMin = convertDateToInput(data.startDate);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    await updateDiscounts(data).then(() => {
      setData(init);
      setIsLoading(false);
    });
  };

  return (
    <Main>
      <form onSubmit={handleSubmit}>
        <h3>Ajouter un code promo</h3>
        <div className={'form_container'}>
          <div className={'input_group'}>
            <label htmlFor="code">Code</label>
            <input
              type="text"
              name="code"
              id="code"
              onChange={onChange}
              value={data.code}
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
              value={data.cumulative ? 'true' : 'false'}
            />
          </div>
          <div className={'input_group'}>
            <label htmlFor="enabled">Activé</label>
            <input
              type="checkbox"
              name="enabled"
              id="enabled"
              onChange={onChange}
              value={data.enabled ? 'true' : 'false'}
            />
          </div>
        </div>
        <Button
          variant={'primary'}
          width={'100%'}
          padded={false}
          disabled={isLoading}
        >
          Ajouter un code promo
        </Button>
      </form>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  width: 70%;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    h3 {
      text-align: center;
      color: ${theme.colors.primary};
    }

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
  }
`;
