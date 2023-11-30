import styled from 'styled-components';
import { DiscountType, initialDiscountState } from '@Types/DiscountType.ts';
import React, { useEffect, useState } from 'react';
import { Button } from '~@/ui/components/Button.tsx';

export const DiscountForm = () => {
  const [data, setData] = useState<DiscountType>(initialDiscountState);
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

  const startDateMin = new Date().toISOString().split('T')[0];
  const endDateMin = new Date(data.startDate).toISOString().split('T')[0];

  return (
    <Main>
      <form>
        <div className={'form_container'}>
          <div className={'input_group'}>
            <label htmlFor="code">Code</label>
            <input type="text" name="code" id="code" onChange={onChange} />
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
              value={data.startDate.toString()}
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
              value={data.endDate.toString()}
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
        <Button variant={'primary'} width={'100%'} padded={false}>
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
      }
    }
  }
`;
