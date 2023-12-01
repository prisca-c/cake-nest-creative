import styled from 'styled-components';
import { theme } from '~@/ui/theme';
import { BiRightArrowCircle } from 'react-icons/bi';
import { Button } from '~@/ui/components/Button.tsx';
import { useAddDiscountToCart } from '@Hooks/form/useAddDiscountToCart.ts';

export const AddDiscount = () => {
  const { handleAddDiscount, timerState, submitMessage } =
    useAddDiscountToCart();
  return (
    <Main>
      <div className={'discount_content'}>
        <p>Code de réduction</p>
        <form onSubmit={handleAddDiscount}>
          <input type="text" placeholder="Code" id={'code'} />
          <Button variant={'white'} width={'fit-content'} padded={false}>
            <BiRightArrowCircle
              size={20}
              color={theme.colors.background_dark}
              className={'add-icon'}
            />
          </Button>
        </form>
      </div>
      {timerState && (
        <p className={'submit_message'} style={{ color: submitMessage.color }}>
          {submitMessage.text}
        </p>
      )}
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  .discount_content {
    display: flex;
    gap: 10px;
    align-items: center;
    background-color: ${theme.colors.primary};
    padding: 15px 10px;
    height: 20px;
    width: calc(100% - 20px - 4px);
    color: ${theme.colors.background_dark};
    border: 2px solid ${theme.colors.background_dark};

    form {
      display: flex;
      gap: 10px;
      align-items: center;
      flex: 1;

      input {
        border: none;
        border-radius: 5px;
        padding: 5px;
        width: 100%;
      }

      .add-icon {
        cursor: pointer;
      }
    }
  }

  .submit_message {
    text-align: center;
  }
`;
