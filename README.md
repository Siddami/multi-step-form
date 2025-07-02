# Multi-Step Registration Form

This project is a modern, accessible multi-step registration form built with [Next.js](https://nextjs.org/), [React Hook Form](https://react-hook-form.com/), and [Zod](https://zod.dev/) for schema validation. It features step-by-step user input, validation, and a review/confirmation step.

## Thought Process & Dependencies

### Why Shadcn UI?

I chose [shadcn/ui](https://ui.shadcn.com/) for its composable, accessible, and unstyled React components. This allowed me to quickly scaffold the UI with a consistent design system, while still giving me full control over styling via Tailwind CSS. The flexibility of shadcn/ui made it easier to build custom layouts and interactive elements like the step indicator.

### Why Zod?

[Zod](https://zod.dev/) was selected for schema validation because of its TypeScript-first approach and seamless integration with React Hook Form via the `zodResolver`. Zod enables robust, declarative validation logic that is easy to maintain and extend as the form grows.

### Other Dependencies

- **React Hook Form**: For performant, scalable form state management and validation.
- **Lucide React**: For clean, modern icons in the UI (e.g., step indicator icons).
- **Tailwind CSS**: For utility-first styling and rapid prototyping.

## Challenges & Customization

### Step Indicator Customization

One of the main challenges was customizing the step indicator to be both visually appealing and accessible. The default shadcn/ui components provided a good starting point, but I needed to:

- Implement a progress bar that visually tracks the user's progress.
- Show icons and labels for each step, with clear distinction between completed, current, and upcoming steps.
- Ensure keyboard and screen reader accessibility.

This required writing a custom [`StepIndicator`](components/StepIndicator.tsx) component and carefully managing state transitions and ARIA attributes.

### Validation & User Experience

Integrating Zod with React Hook Form required careful mapping of validation errors to user-friendly messages. Ensuring that validation only triggered for the current step, and not the entire form, was another challenge that was solved by dynamically triggering validation for relevant fields.

