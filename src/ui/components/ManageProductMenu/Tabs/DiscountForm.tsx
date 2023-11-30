import styled from 'styled-components';
import { DiscountType } from '@Types/DiscountType.ts';
import { Button } from '~@/ui/components/Button.tsx';
import { theme } from '~@/ui/theme';
import { convertDateToInput } from '@Utils/date.ts';
import { useDiscountForm } from '@Hooks/form/useDiscountForm.ts';

export const DiscountForm = () => {
  const {
    data,
    isLoading,
    onChange,
    handleSubmit,
    label,
    resetSelectedDiscount,
    removeDiscount,
    startDateMin,
    endDateMin,
    selectedDiscount,
  } = useDiscountForm();

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
