"use client";
import { useState } from "react";
import { Modal, Checkbox, Button } from "antd";
import { toast } from "sonner";
import {
  FiShield,
  FiFileText,
  FiLock,
  FiCheckCircle,
  FiCheck,
} from "react-icons/fi";
import {
  useStaticContentQuery,
  useStaticContentUpdateMutation,
} from "@/redux/api/features/myProfile";

/**
 * Combined Terms & Conditions + Privacy Policy modal.
 *
 * - Fetches both static contents (terms-and-conditions, privacy-policy) and
 *   shows them together inside one scrollable modal.
 * - Fully blocking: no close icon, no outside-click / Escape close, until
 *   the user has checked BOTH checkboxes and pressed the single submit
 *   button. This does not touch profile data and does not navigate away
 *   from the current page (no more redirect to /dashboard/terms or
 *   /dashboard/privacy).
 * - Fires both mutations together (isTermAccepted + isPrivacyAccepted) so
 *   the backend record is updated in one combined save action.
 *
 * Props:
 *   open        - boolean, whether the modal is visible
 *   onAccepted  - callback fired after both are successfully saved
 */
const AcceptPolicyModal = ({ open, onAccepted }) => {
  const [privacyMutation, { isLoading: isSaving }] =
    useStaticContentUpdateMutation();

  const {
    data: termsData,
    currentData: termsCurrentData,
    isLoading: termsLoading,
    isFetching: termsFetching,
  } = useStaticContentQuery("terms-and-conditions", { skip: !open });

  const {
    data: privacyData,
    currentData: privacyCurrentData,
    isLoading: privacyLoading,
    isFetching: privacyFetching,
  } = useStaticContentQuery("privacy-policy", { skip: !open });

  const termsContent = (termsData ?? termsCurrentData)?.data?.content;
  const privacyContent = (privacyData ?? privacyCurrentData)?.data?.content;

  const contentLoading =
    (termsLoading || termsFetching) && (privacyLoading || privacyFetching);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const canSubmit = acceptedTerms && acceptedPrivacy && !isSaving;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    const date = new Date().toLocaleDateString();
    const toastId = toast.loading(
      "Accepterer vilkår og betingelser samt privatlivspolitik…",
    );

    try {
      // Fire both acceptances together as one combined save action.
      await privacyMutation({
        isTermAccepted: true,
        termsDate: date,
        isPrivacyAccepted: true,
        privacyDate: date,
      }).unwrap();

      toast.success(
        "Vilkår og betingelser samt privatlivspolitik accepteret succesfuldt",
        { id: toastId, duration: 2000 },
      );

      onAccepted?.();
    } catch (error) {
      console.log(error);
      toast.error(
        "Der opstod et problem med at acceptere vilkår/privatlivspolitik",
        { id: toastId, duration: 2000 },
      );
    }
  };

  return (
    <Modal
      open={open}
      closable={false}
      maskClosable={false}
      keyboard={false}
      footer={null}
      width={800}
      centered
      destroyOnClose
    >
      <div className="bg-secondary-color flex items-center gap-3 p-5 -m-6 mb-6 rounded-tl-xl rounded-tr-xl">
        <FiShield className="text-primary-color" size={26} />
        <p className="text-2xl text-primary-color font-semibold">
          Accepter vilkår og betingelser &amp; privatlivspolitik
        </p>
      </div>

      <div className="px-1">
        {contentLoading ? (
          <div className="flex justify-center items-center py-10">
            <span>Indlæser…</span>
          </div>
        ) : (
          <div className="max-h-[55vh] overflow-y-auto pr-2 border border-gray-200 rounded-xl p-4 mb-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FiFileText className="text-secondary-color" size={20} />
              Vilkår og betingelser
            </h2>
            <div
              className="text-base font-medium mb-8 text-justify"
              dangerouslySetInnerHTML={{ __html: termsContent || "" }}
            />

            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FiLock className="text-secondary-color" size={20} />
              Privatlivspolitik
            </h2>
            <div
              className="text-base font-medium text-justify"
              dangerouslySetInnerHTML={{ __html: privacyContent || "" }}
            />
          </div>
        )}

        <div className="flex flex-col gap-3 mb-6">
          <Checkbox
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          >
            <span className="inline-flex items-center gap-2">
              <FiFileText className="text-secondary-color" size={16} />
              Jeg har læst og accepterer vilkår og betingelser
              {acceptedTerms && (
                <FiCheck className="text-green-500" size={16} />
              )}
            </span>
          </Checkbox>
          <Checkbox
            checked={acceptedPrivacy}
            onChange={(e) => setAcceptedPrivacy(e.target.checked)}
          >
            <span className="inline-flex items-center gap-2">
              <FiLock className="text-secondary-color" size={16} />
              Jeg har læst og accepterer privatlivspolitikken
              {acceptedPrivacy && (
                <FiCheck className="text-green-500" size={16} />
              )}
            </span>
          </Checkbox>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            loading={isSaving}
            icon={!isSaving && <FiCheckCircle size={20} />}
            className="py-6 px-8 border  !border-secondary-color hover:border-secondary-color text-xl !text-primary-color !bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Accepter
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AcceptPolicyModal;
